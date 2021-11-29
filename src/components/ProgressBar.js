import * as React from 'react'
import {ProgressBar as BaseUiProgressBar, SIZE} from 'baseui/progress-bar'
import * as ClientMemory from '../client-memory'

export function ProgressBar() {
  const {numOfAllRequiredQuestions, numOfAllRespondedQuestions} =
    ClientMemory.calculateNumberOfRequiredAndResponded()

  const respondedProgress = (
    (100 * numOfAllRespondedQuestions) /
    numOfAllRequiredQuestions
  ).toFixed(0)
  const numOfRemaining = numOfAllRequiredQuestions - numOfAllRespondedQuestions

  return (
    <BaseUiProgressBar
      getProgressLabel={value =>
        `ตอบแบบสอบถามแล้ว ${value}% เหลืออีกน้อยกว่า ${numOfRemaining} ข้อ`
      }
      showLabel
      overrides={{
        BarContainer: {
          style: ({$theme}) => ({
            marginTop: '0px',
            marginRight: '0px',
            marginLeft: '0px',
            marginBottom: '0px',
          }),
        },
        Bar: {
          style: ({$theme}) => ({
            overflow: 'revert',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
          }),
        },
        BarProgress: {
          style: ({$theme, $value}) => ({
            backgroundImage:
              'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            position: 'relative',
            ':after': {
              fontSize: '18px',
              color: '#ec8c69',
              position: 'absolute',
              content: `"▲"`,
              bottom: '-16px',
              right: '-8.5px',
            },
          }),
        },
      }}
      value={respondedProgress}
      size={SIZE.large}
      successValue={100}
    />
  )
}
