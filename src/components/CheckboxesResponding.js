import * as React from 'react'
import {Input} from 'baseui/input'
import {Checkbox} from 'baseui/checkbox'
import {colors} from 'baseui/tokens'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

function CheckboxesResponding({question, onValidate = () => {}}) {
  const [checkboxes, setCheckboxes] = React.useState(
    initCheckboxesFromMemory(question),
  )
  const [otherText, setOtherText] = React.useState(
    initOtherTextFromMemory(question.id),
  )
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function validateValuesWhenChanged() {
      const isCheckboxesOk = checkboxes.some(checked => !!checked)
      const isOtherAnswerOk = otherText !== ''
      const isAllOk = isCheckboxesOk || isOtherAnswerOk

      onValidateRef.current(isAllOk)
    },
    [checkboxes, otherText],
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      const {displayAsCheckboxOptions} = generateInitialCheckboxesValues(
        question.options,
      )

      const checkedRespondingOptions = displayAsCheckboxOptions.map(
        (option, optionIndex) => {
          return {
            respondingText: option.title,
            weight: +checkboxes[optionIndex],
            isOther: false,
            respondingOtherText: null,
          }
        },
      )

      let savingRespondingOptions = [
        ...checkedRespondingOptions,
        {
          respondingText: null,
          weight: otherText?.trim() ? 1 : 0,
          isOther: true,
          respondingOtherText: otherText?.trim() ? otherText.trim() : null,
        },
      ]

      ClientMemory.patchRespondingByQuestionId(question.id, {
        respondingOptions: savingRespondingOptions,
      })
    },
    [checkboxes, otherText, question],
  )

  const isAbleAnswerOther = question.options.some(
    option => option.type === 'SHORT_ANSWER',
  )

  const handleOnCheckboxesChange = (isChecked, optionIndex) => {
    checkboxes[optionIndex] = isChecked
    setCheckboxes([...checkboxes])
  }

  const handleOnOtherTextChange = ({target}) => {
    const currentOtherAnswer = target.value
    setOtherText(currentOtherAnswer)
  }

  const {displayAsCheckboxOptions} = generateInitialCheckboxesValues(
    question.options,
  )

  return (
    <RespondingCommon question={question}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {displayAsCheckboxOptions.map((option, optionIndex) => (
          <Checkbox
            key={option.title}
            checked={checkboxes[optionIndex]}
            onChange={({target}) =>
              handleOnCheckboxesChange(target.checked, optionIndex)
            }
            overrides={{
              Root: {
                style: {
                  backgroundColor: colors.gray50,
                  padding: '10px 14px',
                },
              },
            }}
          >
            {option.title}
          </Checkbox>
        ))}
        {isAbleAnswerOther ? (
          <Input
            value={otherText}
            onChange={handleOnOtherTextChange}
            placeholder="อื่นๆ โปรดระบุ"
            clearOnEscape
            clearable
          />
        ) : null}
      </div>
    </RespondingCommon>
  )
}

function initCheckboxesFromMemory(question) {
  const memoryResponding = ClientMemory.getRespondingByQuestionId(question.id)

  const memoryValues = memoryResponding?.respondingOptions ?? []

  if (memoryValues.length > 0) {
    const memoryCheckboxes = memoryValues.map(responding => !!responding.weight)

    return memoryCheckboxes
  }

  const {initialCheckboxes} = generateInitialCheckboxesValues(question.options)

  return initialCheckboxes
}

function initOtherTextFromMemory(questionId) {
  const memoryResponding = ClientMemory.getRespondingByQuestionId(questionId)

  const memoryValues = memoryResponding?.respondingOptions ?? []

  const otherTextResponding = memoryValues.find(
    memoryValue => !!memoryValue.respondingOtherText,
  )

  if (otherTextResponding) {
    return otherTextResponding.respondingOtherText
  }

  return ''
}

function generateInitialCheckboxesValues(options) {
  const displayAsCheckboxOptions = options.filter(
    option => option.type === undefined,
  )
  const initialCheckboxes = displayAsCheckboxOptions.map(() => false)

  return {
    displayAsCheckboxOptions,
    initialCheckboxes,
  }
}

export {CheckboxesResponding}
