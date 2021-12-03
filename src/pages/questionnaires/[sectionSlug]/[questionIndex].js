import * as React from 'react'

import {Block} from 'baseui/block'
import {motion, AnimatePresence} from 'framer-motion'

import * as QuestionnairesUtils from '../../../questionnaires-utils'
import * as ClientMemory from '../../../client-memory'
import {MainNavigation} from '../../../components/MainNavigation'
import {ShortAnswerResponding} from '../../../components/ShortAnswerResponding'
import {LongAnswerResponding} from '../../../components/LongAnswerResponding'
import {MultiChoiceResponding} from '../../../components/MultiChoiceResponding'
import {CheckboxesResponding} from '../../../components/CheckboxesResponding'
import {PrioritizationResponding} from '../../../components/PrioritizationResponding'
import {ActionsGroup} from '../../../components/ActionsGroup'
import {ProgressBar} from '../../../components/ProgressBar'
import {ClientOnly} from '../../../components/ClientOnly'
import {SuperHeader} from '../../../components/SuperHeader'

import {usePrevious} from '../../../hooks/usePrevious'
import {useClientSession} from '../../../hooks/useClientSession'
import {usePreventUserOnSubmitUnavailable} from '../../../hooks/usePreventUserOnSubmitUnavailable'

const RESPONDING_COMPONENTS = {
  SHORT_ANSWER: ShortAnswerResponding,
  MULTI_CHOICE: MultiChoiceResponding,
  WEIGHTED_MULTI_CHOICE: MultiChoiceResponding,
  CHECKBOXES: CheckboxesResponding,
  PRIORITIZATION: PrioritizationResponding,
  LONG_ANSWER: LongAnswerResponding,
}

const questionMotionVariants = {
  enter: direction => {
    return {
      x: direction >= 0 ? 200 : -200,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }
  },
}

function Questionnaire({question}) {
  usePreventUserOnSubmitUnavailable()
  const sessionId = useClientSession()
  const prevQuestionLinkIndex = usePrevious(question.linkIndex)

  const direction =
    prevQuestionLinkIndex !== undefined
      ? question.linkIndex - prevQuestionLinkIndex
      : 0

  const [isRespondingOk, setIsRespondingOk] = React.useState(false)
  const [isEditedRespondingOnceOnVisit, setIsEditedRespondingOnceOnVisit] =
    React.useState(false)

  const [registeredGroups, setRegisteredGroups] = React.useState(null)

  React.useEffect(
    function restoreStatesWhenQuestionChanged() {
      setIsEditedRespondingOnceOnVisit(false)
    },
    [question],
  )

  React.useEffect(
    function onSessionIdChangeHandler() {
      const registeredGroups =
        typeof window !== 'undefined'
          ? ClientMemory.getRegisteredGroups()
          : null
      setRegisteredGroups(registeredGroups)
    },
    [sessionId, question.id],
  )

  const handleOnRespondingValidate = isOk => {
    setIsRespondingOk(isOk)
  }

  const handleOnRespondingEdited = () => {
    setIsEditedRespondingOnceOnVisit(true)
  }

  const handleOnRegisteringNewGroups = newRegisteringGroups => {
    setRegisteredGroups([...newRegisteringGroups])
  }

  const RespondingComp = RESPONDING_COMPONENTS[question.type]

  const {title, subtitle} =
    QuestionnairesUtils.getSectionTitleInfoBySectionSlug(question.sectionSlug)

  return (
    <>
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          isolation: 'isolate',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 99,
          }}
        >
          <SuperHeader style={{
            background: #7f68a9;,
          }}>แบบสอบถามคุณลักษณะของ Gen Z</SuperHeader>
          <ClientOnly>
            <ProgressBar />
          </ClientOnly>
        </div>
        <ClientOnly>
          <MainNavigation key={sessionId} title={title} subtitle={subtitle} />
        </ClientOnly>
        <Block height={'48px'} />
        <section
          className="holy-grail-wrapper"
          style={{
            isolation: 'isolate',
            flex: '1',
            // NOTE: Prevent overflow on X axis while animating any change of each question
            overflowX: 'hidden',
          }}
        >
          <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={questionMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {type: 'spring', stiffness: 300, damping: 30},
                opacity: {duration: 0.5},
              }}
            >
              <ClientOnly>
                <RespondingComp
                  // Note: Providing `key` forcing a RespondingComp to be an
                  // instance of a question, when question is changed the previous
                  // question with the previous RespondingComp will be destroy
                  // and then the new one will be mounted.
                  key={question.id}
                  question={question}
                  onValidate={handleOnRespondingValidate}
                  onRegisteringGroups={handleOnRegisteringNewGroups}
                  onEdited={handleOnRespondingEdited}
                />
              </ClientOnly>
            </motion.div>
          </AnimatePresence>
        </section>
        <Block height={'212px'} />
      </div>
      <ClientOnly>
        <ActionsGroup
          isRespondingOk={isRespondingOk}
          registeredGroups={registeredGroups}
          // linkCursor={linkCursor}
          question={question}
          isEditedRespondingOnceOnVisit={isEditedRespondingOnceOnVisit}
        />
      </ClientOnly>
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
        linkIndex: thisQuestionLinkIndex,
      },
    },
  }
}

export default Questionnaire
