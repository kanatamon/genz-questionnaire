import * as React from 'react'
import {Input} from 'baseui/input'
import {Checkbox} from 'baseui/checkbox'
import {colors} from 'baseui/tokens'

import * as ClientMemory from '../client-memory'

import {RespondingCommon} from './RespondingCommon'

function CheckboxesResponding({question, onValidate = () => {}}) {
  const [checkboxes, setCheckboxes] = React.useState([])
  const [otherText, setOtherText] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValuesToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValues = memoryResponding?.respondingOptions ?? []

      const checkboxRespondings = memoryValues.filter(
        memoryValue => !!memoryValue.respondingText,
      )

      const {displayAsCheckboxOptions, initialCheckboxes} =
        generateInitialCheckboxesValues(question)

      if (checkboxRespondings.length > 0) {
        const respondingTexts = checkboxRespondings.map(
          responding => responding.respondingText,
        )

        const memoryCheckboxes = displayAsCheckboxOptions.map(option =>
          respondingTexts.includes(option.title),
        )

        setCheckboxes(memoryCheckboxes)
      } else {
        setCheckboxes(initialCheckboxes)
      }

      const otherTextResponding = memoryValues.find(
        memoryValue => !!memoryValue.respondingOtherText,
      )

      if (otherTextResponding) {
        setOtherText(otherTextResponding.respondingOtherText)
      } else {
        setOtherText('')
      }
    },
    [question],
  )

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
      const {displayAsCheckboxOptions} =
        generateInitialCheckboxesValues(question)

      const checkedRespondingOptions = checkboxes
        .map((checked, checkboxIndex) => {
          if (checked) {
            return {
              respondingText: displayAsCheckboxOptions[checkboxIndex].title,
              weight: null,
              isOther: false,
              respondingOtherText: null,
            }
          }

          return null
        })
        .filter(respondingOption => !!respondingOption)

      let patchedRespondingOptions = [...checkedRespondingOptions]

      if (otherText) {
        patchedRespondingOptions = [
          ...patchedRespondingOptions,
          {
            respondingText: null,
            weight: null,
            isOther: true,
            respondingOtherText: otherText,
          },
        ]
      }

      ClientMemory.patchRespondingByQuestionId(question.id, {
        respondingOptions: patchedRespondingOptions,
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

  const {displayAsCheckboxOptions} = generateInitialCheckboxesValues(question)

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

function generateInitialCheckboxesValues(question) {
  const displayAsCheckboxOptions = question.options.filter(
    option => option.type === undefined,
  )
  const initialCheckboxes = displayAsCheckboxOptions.map(() => false)

  return {
    displayAsCheckboxOptions,
    initialCheckboxes,
  }
}

export {CheckboxesResponding}
