import * as React from 'react'

import {Block} from 'baseui/block'

import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../../../questionnaires-utils'
import * as ClientMemory from '../../../client-memory'
import {MainNavigation} from '../../../components/MainNavigation'
import {ShortAnswerResponding} from '../../../components/ShortAnswerResponding'
import {LongAnswerResponding} from '../../../components/LongAnswerResponding'
import {MultiChoiceResponding} from '../../../components/MultiChoiceResponding'
import {CheckboxesResponding} from '../../../components/CheckboxesResponding'
import {PrioritizationResponding} from '../../../components/PrioritizationResponding'
import {ActionsGroup} from '../../../components/ActionsGroup'

const RESPONDING_COMPONENTS = {
  SHORT_ANSWER: ShortAnswerResponding,
  MULTI_CHOICE: MultiChoiceResponding,
  CHECKBOXES: CheckboxesResponding,
  PRIORITIZATION: PrioritizationResponding,
  LONG_ANSWER: LongAnswerResponding,
}

function useResetMemory() {
  const router = useRouter()

  const isNewResponding = router.query.isNewResponding !== undefined

  if (isNewResponding) {
    ClientMemory.reset()
  }
}

function Questionnaire({question}) {
  useResetMemory()

  const [isRespondingOk, setIsRespondingOk] = React.useState(false)
  const [isEditedRespondingOnceOnVisit, setIsEditedRespondingOnceOnVisit] =
    React.useState(false)

  const [registeredGroups, setRegisteredGroups] = React.useState(() => {
    return typeof window !== 'undefined'
      ? ClientMemory.getRegisteredGroups()
      : []
  })

  React.useEffect(
    function restoreStatesWhenQuestionChanged() {
      setIsEditedRespondingOnceOnVisit(false)
    },
    [question],
  )

  const handleOnRespondingValidate = isOk => {
    setIsRespondingOk(isOk)
  }

  const handleOnRespondingEdited = () => {
    setIsEditedRespondingOnceOnVisit(true)
  }

  const handleOnRegisteringNewGroups = newRegisteringGroups => {
    setRegisteredGroups(newRegisteringGroups)
  }

  const RespondingComp = RESPONDING_COMPONENTS[question.type]

  const sectionDisplayIndex =
    QuestionnairesUtils.getSectionDisplayIndexBySectionSlug(
      question.sectionSlug,
    )
  const title = `ตอนที่ ${sectionDisplayIndex}`

  return (
    <>
      <MainNavigation title={title} />
      <Block height={'48px'} />
      <div className="holy-grail-wrapper">
        <RespondingComp
          question={question}
          onValidate={handleOnRespondingValidate}
          onRegisteringGroups={handleOnRegisteringNewGroups}
          onEdited={handleOnRespondingEdited}
        />
      </div>
      <Block height={'128px'} />
      <ActionsGroup
        isRespondingOk={isRespondingOk}
        registeredGroups={registeredGroups}
        question={question}
        isEditedRespondingOnceOnVisit={isEditedRespondingOnceOnVisit}
      />
      <Block height={'64px'} />
    </>
  )
}

export async function getStaticPaths() {
  const paths = QuestionnairesUtils.getAllQuestionsParams().map(
    questionParams => ({
      params: questionParams,
    }),
  )

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const thisQuestionParams = {
    sectionSlug: params.sectionSlug,
    questionIndex: params.questionIndex,
  }

  const allQuestionsParams = QuestionnairesUtils.getAllQuestionsParams()

  const allQuestionLinks = allQuestionsParams.map(
    QuestionnairesUtils.generateQuestionLink,
  )

  const thisRouteQuestionLink =
    QuestionnairesUtils.generateQuestionLink(thisQuestionParams)

  const thisQuestionLinkIndex = allQuestionLinks.indexOf(thisRouteQuestionLink)

  const nextQuestionLink = allQuestionLinks[thisQuestionLinkIndex + 1] ?? null
  const prevQuestionLink = allQuestionLinks[thisQuestionLinkIndex - 1] ?? null

  const thisQuestion =
    QuestionnairesUtils.getQuestionByQuestionParams(thisQuestionParams)

  const questionId = QuestionnairesUtils.generateQuestionId(thisQuestionParams)

  return {
    props: {
      question: {
        id: questionId,
        ...thisQuestionParams,
        ...thisQuestion,
        prevQuestionLink,
        nextQuestionLink,
      },
    },
  }
}

export default Questionnaire
