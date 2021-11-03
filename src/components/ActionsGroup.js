import * as React from 'react'

import {AnimatePresence} from 'framer-motion'
import {useStyletron} from 'baseui'
import {Checkbox, LABEL_PLACEMENT} from 'baseui/checkbox'

import ArrowRight from 'baseui/icon/arrow-right'
import ArrowLeft from 'baseui/icon/arrow-left'

import Link from 'next/link'
import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../questionnaires-utils'

import * as ClientMemory from '../client-memory'

import {SubmitConfirmationModal} from './SubmitConfirmationModal'
import {Button} from './Button'
import {SproutMotionWrapper} from './SproutMotionWrapper'

function ActionsGroup({
  question,
  linkCursor,
  isRespondingOk,
  isEditedRespondingOnceOnVisit,
}) {
  const router = useRouter()
  const [css, theme] = useStyletron()

  const [isOpenSubmitConfirmationModal, setIsOpenSubmitConfirmationModal] =
    React.useState(false)
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
      <SubmitConfirmationModal
        isOpen={isOpenSubmitConfirmationModal}
        onClose={() => setIsOpenSubmitConfirmationModal(false)}
      />
    </>
  )
}

export {ActionsGroup}
