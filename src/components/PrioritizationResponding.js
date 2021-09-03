import * as React from 'react'

import {styled} from 'baseui'
import {List, arrayMove, arrayRemove} from 'baseui/dnd-list'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

function PrioritizationResponding({question, onValidate = () => {}}) {
  const [items, setItems] = React.useState([])
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
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

      if (isSavedInMemory) {
        initialItems = memoryItems
          .sort(function lessToMost(a, b) {
            return a.weight - b.weight
          })
          .map(option => option.respondingText)
      } else {
        initialItems = question.options.map(option => option.title)
      }

      setItems(initialItems)
    },
    [question],
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      const patchedRespondingOptions = items.map((item, itemIndex) => ({
        respondingText: item,
        weight: itemIndex + 1,
        isOther: true,
        respondingOtherText: null,
      }))

      ClientMemory.patchRespondingByQuestionId(question.id, {
        respondingOptions: patchedRespondingOptions,
      })
    },
    [question, items],
  )

  return (
    <RespondingCommon question={question}>
      <ListWrapper>
        <List
          items={items}
          overrides={{
            DragHandle: WeightDragHandle,
          }}
          onChange={({oldIndex, newIndex}) =>
            setItems(
              newIndex === -1
                ? arrayRemove(items, oldIndex)
                : arrayMove(items, oldIndex, newIndex),
            )
          }
        />
        <DragGuard />
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

const WeightDragHandle = ({$index}) => {
  return (
    <div
      style={{
        marginRight: '16px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="luster"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: 999,
          color: '#ffffff',
          backgroundColor: '#000000',
          display: 'grid',
          placeContent: 'center',
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        {$index + 1}
      </div>
    </div>
  )
}

export {PrioritizationResponding}
