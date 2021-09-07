import * as React from 'react'
import {ProgressBar as BaseUiProgressBar, SIZE} from 'baseui/progress-bar'
import * as ClientMemory from '../client-memory'

export function ProgressBar() {
  const respondedProgress = ClientMemory.calculateProgress() * 100

  return (
    <BaseUiProgressBar
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
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
          }),
        },
        BarProgress: {
          style: ({$theme}) => ({
            backgroundImage:
              'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
          }),
        },
      }}
      value={respondedProgress}
      size={SIZE.large}
      successValue={100}
    />
  )
}
