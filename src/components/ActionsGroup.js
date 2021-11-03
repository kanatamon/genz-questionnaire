import * as React from 'react'

import {AnimatePresence} from 'framer-motion'
import {useStyletron} from 'baseui'
import {Checkbox, LABEL_PLACEMENT} from 'baseui/checkbox'

import ArrowRight from 'baseui/icon/arrow-right'
import ArrowLeft from 'baseui/icon/arrow-left'

import Link from 'next/link'
import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../questionnaires-utils'
import * as QuestionnairesService from '../services/questionnaires'
import * as ClientMemory from '../client-memory'

import {SubmitResultModal} from './SubmitResultModal'
import {Button} from './Button'
import {SproutMotionWrapper} from './SproutMotionWrapper'

const IDLE = 'idle'
const PENDING = 'pending'
const SUCCESS = 'success'
const FAILURE = 'failure'

function ActionsGroup({
  question,
  linkCursor,
  isRespondingOk,
  isEditedRespondingOnceOnVisit,
}) {
  const router = useRouter()
  const [css, theme] = useStyletron()

  const [isOpenSubmitResultModal, setIsOpenSubmitResultModal] =
    React.useState(false)
  const [submittingStatus, setSubmittingStatus] = React.useState(IDLE)
  const [isAutoNext, setIsAutoNext] = React.useState(false)

  const routerRef = React.useRef(router)
  // const questionRef = React.useRef(question)
  // const isAutoNextRef = React.useRef(isAutoNext)

  // NOTE: syncs all refs using `useLayoutEffect` ensures that the syncRefs()
  // would run before any any other code.
  React.useLayoutEffect(function syncRefs() {
    routerRef.current = router
    // isAutoNextRef.current = isAutoNext
    // questionRef.current = question
  })

  const goToNextQuestion = React.useCallback(() => {
    const {nextQuestionLink} = linkCursor
    if (nextQuestionLink) {
      routerRef.current.push(nextQuestionLink)
      ClientMemory.saveFurthestVisitableQuestionLink(nextQuestionLink)
    }
  }, [linkCursor])

  React.useEffect(
    function switchSubmittingStatusToIdleWhenUserRelizedSomeFailure() {
      if (!isOpenSubmitResultModal && submittingStatus === FAILURE) {
        setSubmittingStatus(IDLE)
      }
    },
    [isOpenSubmitResultModal, submittingStatus],
  )

  const handleOnSubmitAllRespondingsToServer = async () => {
    setSubmittingStatus(PENDING)

    const submittingResult =
      await QuestionnairesService.submitAllRespondingsToServer()

    const submittingStatus = submittingResult.isSuccess ? SUCCESS : FAILURE
    setSubmittingStatus(submittingStatus)
    setIsOpenSubmitResultModal(true)
  }

  const isReadyToSubmit = !question.nextQuestionLink

  let leftAction = null
  let rightAction = null

  if (linkCursor.prevQuestionLink && submittingStatus === IDLE) {
    leftAction = (
      <SproutMotionWrapper key="actions-go-previous" style={{gridColumn: 1}}>
        <Link href={linkCursor.prevQuestionLink}>
          <a>
            <Button variant="secondary" startEnhancer={<ArrowLeft size={24} />}>
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
          disabled={!isRespondingOk}
          onClick={goToNextQuestion}
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
          variant="submit"
          onClick={handleOnSubmitAllRespondingsToServer}
          disabled={submittingStatus !== IDLE}
          isLoading={submittingStatus === PENDING}
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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'saturate(180%) blur(10px)',
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
      <SubmitResultModal
        isOpen={isOpenSubmitResultModal}
        onClose={() => setIsOpenSubmitResultModal(false)}
        isSuccess={submittingStatus === SUCCESS}
      />
    </>
  )
}

export {ActionsGroup}
