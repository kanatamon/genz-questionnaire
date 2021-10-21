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

  const [contact, setContact] = React.useState(() => ({
    email: ClientMemory.getAttendeeEmail(),
    name: ClientMemory.getAttendeeName(),
  }))

  const isUserEnteredContact = !!contact.name && !!contact.email

  const [isOpenActivityModal, setIsOpenActivityModal] = React.useState(false)
  const [isOpenRegisterEditorModal, setIsOpenRegisterEditorModal] =
    React.useState(false)

  React.useEffect(
    function openActivityModalIfUserNeverEnterTheirContactWhenUserRevisit() {
      const memoryAttendeeEmail = ClientMemory.getAttendeeEmail()
      const memoryAttendeeName = ClientMemory.getAttendeeName()

      const isUserEnteredContactInMemory =
        !!memoryAttendeeEmail && !!memoryAttendeeName
      setIsOpenActivityModal(!isUserEnteredContactInMemory)
    },
    [],
  )

  const handleOnContactSubmit = newContact => {
    setContact(newContact)

    ClientMemory.saveAttendeeEmail(newContact.email)
    ClientMemory.saveAttendeeName(newContact.name)
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

      case 'reset_all_responding': {
        setIsOpenActivityModal(!isUserEnteredContact)
        const linkToGo =
          QuestionnairesUtils.generateGetStartedWithoutClearingContactQuestionLink()
        router.push(linkToGo)
        return
      }
    }
  }

  let userItems = [
    {icon: ChevronRight, label: 'ลงทะเบียน', command: 'register'},
    {
      icon: ChevronRight,
      label: 'เริ่มทำแบบสอบถามใหม่',
      command: 'reset_all_responding',
    },
  ]

  if (contact.email && contact.name) {
    userItems = [
      {icon: ChevronRight, label: 'แก้ไขข้อมูลติดต่อ', command: 'edit'},
      {
        icon: ChevronRight,
        label: 'เริ่มทำแบบสอบถามใหม่',
        command: 'reset_all_responding',
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
        username={isUserEnteredContact ? contact.name : ''}
        usernameSubtitle={
          isUserEnteredContact ? contact.email : 'ยังไม่ได้ลงทะเบียน'
        }
        userItems={userItems}
        onUserItemSelect={handleOnItemSelect}
      />
      <ActivityRegisterModal
        isOpen={isOpenActivityModal}
        onClose={() => setIsOpenActivityModal(false)}
        onSubmit={handleOnContactSubmit}
      />
      <RegisterEditorModal
        initialContact={contact}
        isOpen={isOpenRegisterEditorModal}
        onClose={() => setIsOpenRegisterEditorModal(false)}
        onSubmit={handleOnContactSubmit}
      />
    </>
  )
}

export {MainNavigation}
