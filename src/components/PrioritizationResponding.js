import * as React from 'react'

import {List, arrayMove, arrayRemove} from 'baseui/dnd-list'
import {useStyletron} from 'baseui'
import {Avatar} from 'baseui/avatar'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

const WeightDragHandle = ({$index}) => {
  const [css] = useStyletron()
  return (
    <div
      className={css({
        marginRight: '1em',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Avatar name={`${$index + 1}`} />
    </div>
  )
}

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
    </RespondingCommon>
  )
}

export {PrioritizationResponding}
