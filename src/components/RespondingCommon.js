import * as React from 'react'

import {styled} from 'styletron-react'
import {Block} from 'baseui/block'

import {QuestionHeader} from './QuestionHeader'

const RespondingRootWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const RespondingInteractionWrapper = styled('div', {
  maxWidth: '500px',
  width: '100%',
})

function RespondingCommon({question, children}) {
  return (
    <RespondingRootWrapper>
      <QuestionHeader {...question} />
      <Block height={'32px'} />
      <RespondingInteractionWrapper>{children}</RespondingInteractionWrapper>
    </RespondingRootWrapper>
  )
}

export {RespondingCommon}
