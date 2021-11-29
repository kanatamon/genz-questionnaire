import * as React from 'react'

import {Input} from 'baseui/input'
import {styled} from 'baseui'
import {List, arrayMove, arrayRemove} from 'baseui/dnd-list'
import {Paragraph2} from 'baseui/typography'
import {Tooltip, PLACEMENT} from 'baseui/tooltip'
import {Block} from 'baseui/block'

import * as ClientMemory from '../client-memory'
import {useTimeout} from '../hooks/useTimeout'

import {RespondingCommon} from './RespondingCommon'

function PrioritizationResponding({question, onValidate = () => {}}) {
  const [items, setItems] = React.useState([])
  const [shortAnswer, setShortAnswer] = React.useState('')
  const [hasTouched, setHasTouched] = React.useState(false)

  const onValidateRef = React.useRef(onValidate)
  const questionRef = React.useRef(question)

  const limitedWeight = question?.limit ?? question.options.length

  React.useLayoutEffect(function syncRefs() {
    onValidateRef.current = onValidate
    questionRef.current = question
  })

  React.useEffect(function alwaysValidateItems() {
    onValidateRef.current(true)
  }, [])

  React.useEffect(
    function setItemsToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryItems = memoryResponding?.respondingOptions ?? []

      const isSavedInMemory = memoryItems.length > 0

      let initialItems = null
      let initialShortAnswer = null

      if (isSavedInMemory) {
        initialShortAnswer =
          memoryItems.find(item => item.isOther)?.respondingOtherText ?? ''
        initialItems = memoryItems
          .sort(function mostToLess(a, b) {
            return b.weight - a.weight
          })
          .map(option =>
            option.isOther ? 'SHORT_ANSWER' : option.respondingText,
          )
      } else {
        initialShortAnswer = ''
        initialItems = question.options.map(option =>
          !!option.title ? option.title : 'SHORT_ANSWER',
        )
      }

      setItems(initialItems)
      setShortAnswer(initialShortAnswer)
      setHasTouched(false)
    },
    [question],
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      const questionId = questionRef.current?.id

      if (!questionId) {
        return
      }

      const patchedRespondingOptions = items.map((item, itemIndex) => {
        const isOther = item === 'SHORT_ANSWER'
        return {
          isOther,
          weight: convertZeroBasedIndexToWeight(itemIndex, limitedWeight),
          respondingText: isOther ? null : item,
          respondingOtherText: isOther ? shortAnswer : null,
        }
      })

      ClientMemory.patchRespondingByQuestionId(questionId, {
        respondingOptions: patchedRespondingOptions,
      })
    },
    [items, shortAnswer, limitedWeight],
  )

  const renderedItems = items.map(item =>
    item !== 'SHORT_ANSWER' ? (
      <Paragraph2 key={item}>{item}</Paragraph2>
    ) : (
      <Input
        key="SHORT_ANSWER"
        placeholder="อื่นๆ โปรดระบุ"
        value={shortAnswer}
        onChange={e => setShortAnswer(e.target.value)}
      />
    ),
  )

  // NOTE: For none-existing of a short-answer element, the rendered items can be
  // interacted only for changing the prioritization. With that assumption,
  // the <DragGuard/> element can be living.
  const isEnableDragGuard = !question.options.some(
    option => option.type === 'SHORT_ANSWER',
  )

  return (
    <RespondingCommon question={question}>
      <ListWrapper>
        <List
          items={renderedItems}
          overrides={{
            DragHandle: dragHandleProps => (
              <WeightDragHandle
                {...dragHandleProps}
                limitedWeight={question?.limit}
                hasTouched={hasTouched}
              />
            ),
          }}
          onChange={({oldIndex, newIndex}) => {
            setItems(
              newIndex === -1
                ? arrayRemove(items, oldIndex)
                : arrayMove(items, oldIndex, newIndex),
            )
            setHasTouched(true)
          }}
        />
        {isEnableDragGuard ? <DragGuard /> : null}
      </ListWrapper>
    </RespondingCommon>
  )
}

const ListWrapper = styled('div', {
  isolation: 'isolate',
  position: 'relative',
})

const DragGuard = styled('div', ({$theme}) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 'calc(100% - 78px)',
  height: '100%',
  [$theme.mediaQuery.medium]: {
    display: 'none',
  },
}))

const NothingWrapper = ({children}) => {
  return <>{children}</>
}

const DELAY_TO_SHOW_HELPER = 1500

const WeightDragHandle = ({$index, limitedWeight, hasTouched}) => {
  const [isOpenHelper, setIsOpenHelper] = React.useState(false)

  useTimeout(() => {
    setIsOpenHelper(true)
  }, DELAY_TO_SHOW_HELPER)

  const isCurrentItemOverLimit = isZeroBasedIndexIsOverPrioritizationLimit(
    $index,
    limitedWeight,
  )
  const renderedWeight = !isCurrentItemOverLimit ? $index + 1 : null

  const HelperComponent = !hasTouched && $index === 0 ? Tooltip : NothingWrapper

  return (
    <div
      style={{
        marginRight: '16px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <HelperComponent
        isOpen={isOpenHelper}
        popoverMargin={6}
        content={() => (
          <Block padding={'12px'} style={{fontSize: '16px'}}>
            เลื่อนตัวเลข ขึ้น-ลง เพื่อเรียงลำดับความสำคัญ
          </Block>
        )}
        accessibilityType={'tooltip'}
        placement={PLACEMENT.top}
        showArrow
        returnFocus
        autoFocus
      >
        <div
          className="luster"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 999,
            color: '#ffffff',
            backgroundColor: isCurrentItemOverLimit ? '#dadada' : '#000000',
            display: 'grid',
            placeContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {renderedWeight}
        </div>
      </HelperComponent>
    </div>
  )
}

function convertZeroBasedIndexToWeight(zeroBasedIndex, limitedWeight) {
  return Math.max(limitedWeight - zeroBasedIndex, 0)
}

function isZeroBasedIndexIsOverPrioritizationLimit(
  zeroBasedIndex,
  limitedWeight,
) {
  return typeof limitedWeight === 'number' && zeroBasedIndex + 1 > limitedWeight
}

export {PrioritizationResponding}
