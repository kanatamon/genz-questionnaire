import * as React from 'react'

import {Input, SIZE} from 'baseui/input'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

export const ShortAnswerResponding = ({question, onValidate = () => {}}) => {
  const [value, setValue] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValueToWhateverInMemoryWhenQuestionChanged() {
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

  const handleOnChange = ({target}) => {
    const {value: currentValue} = target
    setValue(currentValue)

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingText: currentValue,
    })
  }

  return (
    <RespondingCommon question={question}>
      <Input
        value={value}
        onChange={handleOnChange}
        size={SIZE.large}
        placeholder={question.placeholder}
        type={question.inputTypeForDOM ?? 'text'}
        clearable
        clearOnEscape
      />
    </RespondingCommon>
  )
}
