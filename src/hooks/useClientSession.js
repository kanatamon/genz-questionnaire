import * as React from 'react'
import {useRouter} from 'next/router'

import * as ClientMemory from '../client-memory'
import * as QuestionnairesUtils from '../questionnaires-utils'

import {useHasMounted} from './useHasMounted'

function useClientSession() {
  const router = useRouter()
  const routerRef = React.useRef(router)

  const hasMounted = useHasMounted()
  const [sessionId, setSessionId] = React.useState(generateIdentifier())

  React.useLayoutEffect(function syncRefs() {
    routerRef.current = router
  })

  const visitingUrl = router.asPath

  React.useEffect(
    function () {
      if (!hasMounted) {
        return
      }

      const router = routerRef.current

      switch (router.query?.command) {
        case 'new-form': {
          commandNewFormHandler(router, isSuccess => {
            if (isSuccess) {
              setSessionId(generateIdentifier())
            }
          })
          return
        }

        case 'reset-form': {
          commandResetFormHandler(router)
          return
        }

        case 'furthest-visitable-question': {
          commandFurthestVisitableQuestionHandler(router)
          return
        }

        default: {
          preventUserSkipQuestionViaLinkHandler(router)
          return
        }
      }
    },
    [hasMounted, visitingUrl],
  )

  return sessionId
}

function generateIdentifier() {
  return Date.now()
}

function commandNewFormHandler(router, onExecuted = () => null) {
  const firstQuestionLink = QuestionnairesUtils.generateFirstQuestionLink()

  ClientMemory.resetAll()
  router.replace(firstQuestionLink).then(isSuccess => {
    typeof onExecuted === 'function' && onExecuted(isSuccess)
  })
}

function commandResetFormHandler(router) {
  const firstQuestionLink = QuestionnairesUtils.generateFirstQuestionLink()

  ClientMemory.resetResponding()
  router.replace(firstQuestionLink)
}

function commandFurthestVisitableQuestionHandler(router) {
  const firstQuestionLink = QuestionnairesUtils.generateFirstQuestionLink()
  const visitingLink = router.asPath?.split('?')[0]
  const furthestVisitableQuestionLink =
    ClientMemory.getFurthestVisitableQuestionLink()

  if (!furthestVisitableQuestionLink && visitingLink !== firstQuestionLink) {
    router.push(firstQuestionLink)
  } else if (
    !furthestVisitableQuestionLink &&
    visitingLink === firstQuestionLink
  ) {
    router.replace(visitingLink)
  } else if (furthestVisitableQuestionLink) {
    router.push(furthestVisitableQuestionLink)
  }
}

function preventUserSkipQuestionViaLinkHandler(router) {
  const {questionIndex, sectionSlug} = router.query
  const questionId = QuestionnairesUtils.generateQuestionId({
    questionIndex,
    sectionSlug,
  })
  const respondingOfVisitingQuestion =
    ClientMemory.getRespondingByQuestionId(questionId)

  const hasVisitingQuestionIsCompletelyResponded =
    !!respondingOfVisitingQuestion?.respondingText ||
    respondingOfVisitingQuestion?.respondingOptions?.length > 0

  if (!hasVisitingQuestionIsCompletelyResponded) {
    const questionLinkToGo =
      ClientMemory.getFurthestVisitableQuestionLink() ??
      QuestionnairesUtils.generateFirstQuestionLink()

    router.push(questionLinkToGo)
  }
}

export {useClientSession}
