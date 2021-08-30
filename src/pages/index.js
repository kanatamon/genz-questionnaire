import * as React from 'react'
import {styled, useStyletron} from 'styletron-react'
import {Button} from 'baseui/button'
import Link from 'next/link'

import * as QuestionnairesUtils from '../questionnaires-utils'

// statically styled component
const Title = styled('h1', {
  color: 'red',
  fontSize: '82px',
})

// dynamically styled component
const SubTitle = styled('h2', ({$size}) => ({
  color: 'blue',
  fontSize: `${$size}px`,
}))

export default function LandingPage() {
  // an alternative hook based API
  const [css] = useStyletron()
  const getStartedQuestionLink =
    QuestionnairesUtils.generateGetStartedQuestionLink()

  return (
    <div>
      <Title>Landing Page</Title>
      <SubTitle $size={50}>Subtitle</SubTitle>
      <p className={css({fontSize: '32px'})}>Styled by hook</p>
      <Link href={getStartedQuestionLink} passHref>
        <Button $as="a">Get Started</Button>
      </Link>
    </div>
  )
}
