import * as React from 'react'

import {RadioGroup, Radio, ALIGN} from 'baseui/radio'
import {colors} from 'baseui/tokens'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

function MultiChoiceResponding({
  question,
  onValidate = () => {},
  onRegisteringGroups = () => {},
  onEdited = () => {},
}) {
  const [value, setValue] = React.useState('')

  const onValidateRef = React.useRef(onValidate)
  const onEditedRef = React.useRef(onEdited)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
    onEditedRef.current = onEdited
  })

  React.useEffect(
    function initValueToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValue =
        memoryResponding?.respondingOptions?.[0]?.respondingText

      if (memoryValue) {
        setValue(memoryValue)
        onValidateRef.current(true)
      } else {
        setValue('')
        onValidateRef.current(false)
      }
    },
    [question],
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

    if (currentValue !== value) {
      onEdited()
    }

    setValue(currentValue)

    const optionOfCurrentValue = question.options.find(
      option => option.title === currentValue,
    )

    if (!optionOfCurrentValue) {
      throw new Error(`Oop! there is no option for '${currentValue}'`)
    }

    const {registeringGroups, title, weight = null} = optionOfCurrentValue

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingOptions: [
        {
          respondingText: title,
          weight,
          isOther: false,
          respondingOtherText: null,
        },
      ],
    })

    if (registeringGroups) {
      ClientMemory.saveRegisteredGroups(registeringGroups)
      onRegisteringGroups(registeringGroups)
    }
  }

  return (
    <RespondingCommon question={question}>
      <RadioGroup
        value={value}
        onChange={handleOnValueChange}
        align={ALIGN.vertical}
        overrides={{
          RadioGroupRoot: {
            style: {
              gap: '12px',
            },
          },
        }}
      >
        {question.options.map(option => (
          <Radio
            key={option.title}
            value={option.title}
            description={option.description}
            overrides={{
              Root: {
                style: {
                  backgroundColor: colors.gray50,
                  padding: '10px 14px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  width: '100%',
                },
              },
            }}
          >
            {option.title}
          </Radio>
        ))}
      </RadioGroup>
    </RespondingCommon>
  )
}

export {MultiChoiceResponding}
