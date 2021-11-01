import * as React from 'react'

import {FormControl} from 'baseui/form-control'
import {Input, SIZE} from 'baseui/input'
import {Paragraph4} from 'baseui/typography'

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

  let isValueValid = value !== ''
  if (Array.isArray(question.range) && question.range.length === 2) {
    const [min, max] = question.range
    isValueValid = min <= value && value <= max
  }

  React.useEffect(
    function validateValueWhenChanged() {
      onValidateRef.current(isValueValid)
    },
    [isValueValid],
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
      <FormControl
        caption={<HelperMessages messages={question.notifyingMessages} />}
        error={
          !isValueValid ? (
            <HelperMessages
              heading="ขออภัย"
              messages={question.invalidValueMessages}
            />
          ) : null
        }
      >
        <Input
          value={value}
          onChange={handleOnChange}
          size={SIZE.large}
          placeholder={question.placeholder}
          type={question.inputTypeForDOM ?? 'text'}
          clearable
          clearOnEscape
        />
      </FormControl>
    </RespondingCommon>
  )
}

function HelperMessages({heading, messages}) {
  if (typeof messages === 'string') {
    return messages
  }

  if (Array.isArray(messages)) {
    return (
      <ul
        style={{
          listStyle: 'revert',
          paddingLeft: '16px',
        }}
      >
        {heading ? (
          <Paragraph4
            $style={{
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'inherit',
            }}
          >
            {heading}
          </Paragraph4>
        ) : null}
        {messages.map(message => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  }

  return null
}
