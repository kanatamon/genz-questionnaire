import * as React from 'react'

import {Input} from 'baseui/input'
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
  const [value, setValue] = React.useState(initValueFromMemory(question.id))
  const [shortAnswer, setShortAnswer] = React.useState(
    initShortAnswerFromMemory(question.id),
  )

  const shortAnswerCompRef = React.useRef(null)

  const questionRef = React.useRef(question)
  const onValidateRef = React.useRef(onValidate)
  const onEditedRef = React.useRef(onEdited)
  const onRegisteringGroupsRef = React.useRef(onRegisteringGroups)
  const shortAnswerRef = React.useRef(shortAnswer)

  React.useLayoutEffect(function syncRefs() {
    questionRef.current = question
    onValidateRef.current = onValidate
    onEditedRef.current = onEdited
    onRegisteringGroupsRef.current = onRegisteringGroups
  })

  React.useEffect(
    function syncShortAnswerToRef() {
      shortAnswerRef.current = shortAnswer
    },
    [shortAnswer],
  )

  React.useEffect(
    function validateValueWhenChanged() {
      const isOk = value !== ''
      onValidateRef.current(isOk)
    },
    [value],
  )

  const isAbleToBeShortAnswer = question.options.some(
    option => option.type === 'SHORT_ANSWER',
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      if (!value) {
        return
      }

      let optionOfCurrentValue = questionRef.current.options.find(
        option => option.title === value,
      )

      if (!optionOfCurrentValue) {
        optionOfCurrentValue = questionRef.current.options.find(
          option => option.type === 'SHORT_ANSWER',
        )
      }

      if (!optionOfCurrentValue) {
        throw new Error(`Oop! there is no option for '${value}'`)
      }
      const isShortAnswer = optionOfCurrentValue.type === 'SHORT_ANSWER'
      const {registeringGroups, title, weight = null} = optionOfCurrentValue

      ClientMemory.patchRespondingByQuestionId(questionRef.current.id, {
        respondingOptions: [
          {
            respondingText: isShortAnswer ? null : title,
            weight,
            isOther: isShortAnswer,
            respondingOtherText: isShortAnswer ? shortAnswerRef.current : null,
          },
        ],
      })

      if (registeringGroups) {
        ClientMemory.saveRegisteredGroups(registeringGroups)
        onRegisteringGroupsRef.current?.(registeringGroups)
      }
    },
    [value],
  )

  const handleOnValueChange = ({currentTarget}) => {
    const {value: currentValue} = currentTarget

    if (currentValue !== value && currentValue !== '') {
      onEdited()
    }

    if (currentValue === '' && isAbleToBeShortAnswer) {
      shortAnswerCompRef.current?.focus()
    }

    setValue(currentValue)
  }

  const handleOnShortAnswerFocus = () => {
    setValue(shortAnswer)
  }

  const handleOnShortAnswerChange = ({target}) => {
    const currentShortAnswer = target.value
    setShortAnswer(currentShortAnswer)
    setValue(currentShortAnswer)
  }

  const displayAsMultiChoiceOptions = question.options.filter(
    option => option.type === undefined,
  )

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
        {displayAsMultiChoiceOptions.map(option => (
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
        {isAbleToBeShortAnswer ? (
          <Radio
            key={'SHORT_ANSWER'}
            value={shortAnswer}
            overrides={{
              Root: {
                style: {
                  backgroundColor: colors.gray50,
                  padding: '0px 0px 0px 14px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  width: '100%',
                },
              },
              Label: {
                style: {
                  flex: 1,
                },
              },
            }}
          >
            <Input
              inputRef={shortAnswerCompRef}
              value={shortAnswer}
              onFocus={handleOnShortAnswerFocus}
              onChange={handleOnShortAnswerChange}
              placeholder="อื่นๆ โปรดระบุ"
              clearOnEscape
              clearable
            />
          </Radio>
        ) : null}
      </RadioGroup>
    </RespondingCommon>
  )
}

function initShortAnswerFromMemory(questionId) {
  const memoryResponding = ClientMemory.getRespondingByQuestionId(questionId)
  const memoryShortAnswer =
    memoryResponding?.respondingOptions?.[0]?.respondingOtherText

  return memoryShortAnswer ?? ''
}

function initValueFromMemory(questionId) {
  const memoryResponding = ClientMemory.getRespondingByQuestionId(questionId)
  const memoryRespondingOption = memoryResponding?.respondingOptions?.[0]

  if (!memoryRespondingOption) {
    return ''
  }

  const memoryValue =
    memoryRespondingOption?.respondingText ??
    memoryRespondingOption?.respondingOtherText

  return memoryValue
}

export {MultiChoiceResponding}
