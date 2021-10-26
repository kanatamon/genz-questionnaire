import * as React from 'react'
import {useRouter} from 'next/router'
import * as ClientMemory from '../client-memory'
import * as QuestionnairesUtils from '../questionnaires-utils'
function generateIdentifier() {
  return Date.now()
}

export function useClientSession() {
  const [sessionId, setSessionId] = React.useState(generateIdentifier())

  const router = useRouter()
  const firstQuestionLink = QuestionnairesUtils.generateFirstQuestionLink()

  if (router.query.isGetStarted !== undefined) {
    ClientMemory.resetAll()
    router.replace(firstQuestionLink).then(isSuccess => {
      if (isSuccess) {
        setSessionId(generateIdentifier())
      }
    })
  }

  if (router.query.isGetStartedWithoutClearingContact !== undefined) {
    ClientMemory.resetResponding()
    router.replace(firstQuestionLink)
  }

  return sessionId
}
