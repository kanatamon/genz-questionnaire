import * as React from 'react'

import {AnimatePresence} from 'framer-motion'
import {useStyletron} from 'baseui'
// import {Checkbox, LABEL_PLACEMENT} from 'baseui/checkbox'

import ArrowRight from 'baseui/icon/arrow-right'
import ArrowLeft from 'baseui/icon/arrow-left'

import Link from 'next/link'
import {useRouter} from 'next/router'

import {useReverselyDebounceFn} from '../hooks/useDebounce'
import * as QuestionnairesUtils from '../questionnaires-utils'
import * as ClientMemory from '../client-memory'

import {SubmitConfirmationModal} from './SubmitConfirmationModal'
import {Button} from './Button'
import {SproutMotionWrapper} from './SproutMotionWrapper'

const DELAY_AFTER_LAST_PRESS = 500

function ActionsGroup({
  question,
  registeredGroups,
  isRespondingOk,
  // isEditedRespondingOnceOnVisit,
}) {
  const router = useRouter()
  const [css, theme] = useStyletron()

  const [isOpenSubmitConfirmationModal, setIsOpenSubmitConfirmationModal] =
    React.useState(false)
  // const [isAutoNext, setIsAutoNext] = React.useState(false)

  // const routerRef = React.useRef(router)
  // const questionRef = React.useRef(question)
  // const isAutoNextRef = React.useRef(isAutoNext)

  // NOTE: syncs all refs using `useLayoutEffect` ensures that the syncRefs()
  // would run before any any other code.
  // React.useLayoutEffect(function syncRefs() {
  // routerRef.current = router
  // isAutoNextRef.current = isAutoNext
  // questionRef.current = question
  // })

  // NOTE: `isAllowedToGoNextOnceQuestionChanged` is used to make sure that user can execute
  // `route.push()` only one time for a question even they try to
  // batch and keep clicking multiple times on the Next Button.
  //
  // This mechanism is going to work by the following steps:
  // 1. On component mounted user won't be able to execute the `route.push()`
  // 2. Once the effect of a question-changed executed, `isAllowedToGoNextOnceQuestionChanged`
  //    -will be `true`, and user can continue to check others condition
  // 3. Once use is able to executed `route.push()` on the current question
  //    , then `isAllowedToGoNextOnceQuestionChanged` will immediately set to `false`
  //    , and user won't be able to execute `route.push()` again on the same question.
  const isAllowedToGoNextOnceQuestionChangedRef = React.useRef(false)

  React.useLayoutEffect(
    function resetAllowanceToPressNextBtnWhenQuestionChanged() {
      const id = setTimeout(() => {
        isAllowedToGoNextOnceQuestionChangedRef.current = true
      }, 1000)
      return () => clearTimeout(id)
    },
    [question.id],
  )

  const linkCursor = React.useMemo(
    () => updateLinkCursor(question.id, registeredGroups),
    [question.id, registeredGroups],
  )

  const goToNextQuestionDebounced = useReverselyDebounceFn(() => {
    const {nextQuestionLink} = linkCursor
    const isReadyToGoNext =
      isRespondingOk &&
      !isOpenSubmitConfirmationModal &&
      isAllowedToGoNextOnceQuestionChangedRef.current

    if (nextQuestionLink && isReadyToGoNext) {
      isAllowedToGoNextOnceQuestionChangedRef.current = false
      ClientMemory.saveFurthestVisitableQuestionLink(nextQuestionLink)
      router.push(nextQuestionLink)
    }
  }, DELAY_AFTER_LAST_PRESS)

  const isReadyToSubmit = !question.nextQuestionLink

  let leftAction = null
  let rightAction = null

  if (linkCursor.prevQuestionLink) {
    leftAction = (
      <SproutMotionWrapper key="actions-go-previous" style={{gridColumn: 1}}>
        <Link href={linkCursor.prevQuestionLink}>
          <a>
            <Button
              disabled={isOpenSubmitConfirmationModal}
              variant="secondary"
              startEnhancer={<ArrowLeft size={24} />}
            >
              ก่อนหน้า
            </Button>
          </a>
        </Link>
      </SproutMotionWrapper>
    )
  }

  if (linkCursor.nextQuestionLink) {
    rightAction = (
      <SproutMotionWrapper key="actions-go-next" style={{gridColumn: 2}}>
        <Button
          disabled={!isRespondingOk || isOpenSubmitConfirmationModal}
          onClick={goToNextQuestionDebounced}
          endEnhancer={<ArrowRight size={24} />}
          isChangeEnhancerOnDisabled
        >
          ถัดไป
        </Button>
      </SproutMotionWrapper>
    )
  } else if (!linkCursor.nextQuestionLink && isReadyToSubmit) {
    rightAction = (
      <SproutMotionWrapper key="actions-submit" style={{gridColumn: 2}}>
        <Button
          disabled={isOpenSubmitConfirmationModal}
          variant="submit"
          onClick={() => setIsOpenSubmitConfirmationModal(true)}
        >
          ส่งคำตอบ
          <ArrowRight size={24} />
        </Button>
      </SproutMotionWrapper>
    )
  }

  return (
    <>
      <div
        className={css({
          bottom: '0px',
          position: 'fixed',
          right: '0px',
          left: '0px',
        })}
      >
        <div className="holy-grail-wrapper">
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '16px',
              rowGap: '24px',
              padding: '24px 32px 32px',
              boxShadow: theme.lighting.shadow400,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              marginRight: 'calc(-1 * var(--column-spacing))',
              marginLeft: 'calc(-1 * var(--column-spacing))',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'saturate(180%) blur(2px)',
            })}
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              {leftAction}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter initial={false}>
              {rightAction}
            </AnimatePresence>
            <div
              style={{gridColumn: '1 / -1', gridRow: 2, justifySelf: 'center'}}
            >
              {/* <Checkbox
                checked={isAutoNext}
                onChange={e => setIsAutoNext(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
                disabled={question.type !== 'MULTI_CHOICE'}
              >
                เปิดโหมดเลื่อนคำถามถัดไปอัตโนมัติ?
              </Checkbox> */}
            </div>
          </div>
        </div>
      </div>
      <SubmitConfirmationModal
        isOpen={isOpenSubmitConfirmationModal}
        onClose={() => setIsOpenSubmitConfirmationModal(false)}
      />
    </>
  )
}

function updateLinkCursor(staringQuestionId, registeredGroups) {
  const allQuestionsMap = QuestionnairesUtils.generateAllQuestionsMap()
  const allQuestionsMapIds = Object.keys(allQuestionsMap)

  const thisQuestionPosition = allQuestionsMapIds.indexOf(staringQuestionId)

  const nextQuestionPosition = thisQuestionPosition + 1
  const allPossibleNextQuestionIds =
    allQuestionsMapIds.slice(nextQuestionPosition)

  const nextQuestionLink = findNearestQuestionLink(
    allPossibleNextQuestionIds,
    allQuestionsMap,
    registeredGroups,
  )

  const allPossiblePrevQuestionIds = allQuestionsMapIds
    .slice(0, thisQuestionPosition)
    .reverse()

  const prevQuestionLink = findNearestQuestionLink(
    allPossiblePrevQuestionIds,
    allQuestionsMap,
    registeredGroups,
  )

  return {
    nextQuestionLink,
    prevQuestionLink,
  }
}

function findNearestQuestionLink(
  allPossibleQuestionIds,
  allQuestionsMap,
  registeredGroups,
) {
  const nextQuestionIdIndex = allPossibleQuestionIds.findIndex(questionId => {
    const {showForGroups} = allQuestionsMap[questionId]

    if (!showForGroups) {
      return true
    }

    const isNext =
      registeredGroups?.some(registeredGroup =>
        showForGroups.includes(registeredGroup),
      ) ?? true

    return isNext
  })

  let nextQuestionLink = null

  if (nextQuestionIdIndex !== -1) {
    const nextQuestionId = allPossibleQuestionIds[nextQuestionIdIndex]
    const {link} = allQuestionsMap[nextQuestionId]

    nextQuestionLink = link
  }

  return nextQuestionLink
}

export {ActionsGroup}
