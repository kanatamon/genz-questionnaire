import * as React from 'react'
import {SIZE} from 'baseui/input'
import {Textarea} from 'baseui/textarea'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

function LongAnswerResponding({question, onValidate = () => {}}) {
  const [value, setValue] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValueToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValue = memoryResponding?.respondingText

      if (memoryValue) {
        setValue(memoryValue)
        onValidateRef.current(true)
      } else {
        setValue('')
        onValidateRef.current(false)
      }
    },
    [question.id],
  )

  React.useEffect(
    function validateValueWhenChanged() {
      const isOk = value !== ''
      onValidateRef.current(isOk)
    },
    [value],
  )

  const handleOnValueChange = ({currentTarget}) => {
    const {value: currentValue} = currentTarget
    setValue(currentValue)

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingText: currentValue,
    })
  }

  return (
    <RespondingCommon question={question}>
      <Textarea
        size={SIZE.large}
        value={value}
        placeholder={question.placeholder}
        onChange={handleOnValueChange}
      />
    </RespondingCommon>
  )
}

export {LongAnswerResponding}
