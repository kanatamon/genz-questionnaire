import * as React from 'react'

import {AppNavBar} from 'baseui/app-nav-bar'
import {ChevronRight} from 'baseui/icon'
import Link from 'next/link'
import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../questionnaires-utils'
import * as ClientMemory from '../client-memory'

import {ActivityRegisterModal} from './ActivityRegisterModal'
import {RegisterEditorModal} from './RegisterEditorModal'

function MainNavigation({title}) {
  const router = useRouter()
  const [isOpenActivityModal, setIsOpenActivityModal] = React.useState(false)
  const [isOpenRegisterEditorModal, setIsOpenRegisterEditorModal] =
    React.useState(false)
  const [email, setEmail] = React.useState('')

  React.useEffect(function initSettingToWhateverInMemory() {
    const memoryAttendeeEmail = ClientMemory.getAttendeeEmail()

    if (!memoryAttendeeEmail) {
      setIsOpenActivityModal(true)
    }
  }, [])

  const handleOnEmailSubmit = newEmail => {
    setEmail(newEmail)
    ClientMemory.saveAttendeeEmail(newEmail)
  }

  const handleOnItemSelect = ({command}) => {
    switch (command) {
      case 'register': {
        setIsOpenActivityModal(true)
        return
      }

      case 'edit': {
        setIsOpenRegisterEditorModal(true)
        return
      }

      case 'reset_questionnaire': {
        const getStartedQuestionLink =
          QuestionnairesUtils.generateGetStartedQuestionLink()
        router.push(getStartedQuestionLink)
        setIsOpenActivityModal(true)
        return
      }
    }
  }

  let userItems = [
    {icon: ChevronRight, label: 'ลงทะเบียน', command: 'register'},
    {
      icon: ChevronRight,
      label: 'เริ่มทำแบบสอบถามใหม่',
      command: 'reset_questionnaire',
    },
  ]

  if (email) {
    userItems = [
      {icon: ChevronRight, label: 'แก้ไขอีเมล', command: 'edit'},
      {
        icon: ChevronRight,
        label: 'เริ่มทำแบบสอบถามใหม่',
        command: 'reset_questionnaire',
      },
    ]
  }

  return (
    <>
      <AppNavBar
        title={
          <Link href="/">
            <a>{title}</a>
          </Link>
        }
        username={email}
        usernameSubtitle={email ? '' : 'ยังไม่ได้ลงทะเบียน'}
        userItems={userItems}
        onUserItemSelect={handleOnItemSelect}
      />
      <ActivityRegisterModal
        isOpen={isOpenActivityModal}
        onClose={() => setIsOpenActivityModal(false)}
        onEmailSubmit={handleOnEmailSubmit}
      />
      <RegisterEditorModal
        initialEmail={email}
        isOpen={isOpenRegisterEditorModal}
        onClose={() => setIsOpenRegisterEditorModal(false)}
        onSubmit={handleOnEmailSubmit}
      />
    </>
  )
}

export {MainNavigation}
