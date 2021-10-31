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

  const [contact, setContact] = React.useState(() => {
    const memoryAttendeeContact = ClientMemory.getAttendeeContact()
    return {
      // prefix: memoryAttendeeContact?.prefix ?? '',
      name: memoryAttendeeContact?.name ?? '',
      surname: memoryAttendeeContact?.surname ?? '',
      email: memoryAttendeeContact?.email ?? '',
    }
  })

  const [isOpenActivityModal, setIsOpenActivityModal] = React.useState(
    function openActivityModalIfUserNeverEnterTheirContactWhenUserRevisit() {
      const memoryAttendeeContact = ClientMemory.getAttendeeContact()
      return !isUserEnteredContact(memoryAttendeeContact)
    },
  )
  const [isOpenRegisterEditorModal, setIsOpenRegisterEditorModal] =
    React.useState(false)

  const handleOnContactSubmit = newContact => {
    setContact(newContact)

    ClientMemory.saveAttendeeContact(newContact)
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
        setIsOpenActivityModal(!isUserEnteredContact(contact))
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

  if (isUserEnteredContact(contact)) {
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
        username={
          isUserEnteredContact(contact)
            ? `${contact.name} ${contact.surname}`
            : ''
        }
        usernameSubtitle={
          isUserEnteredContact(contact) ? contact.email : 'ยังไม่ได้ลงทะเบียน'
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

function isUserEnteredContact(contact) {
  return !!contact && Object.values(contact).every(Boolean)
}

export {MainNavigation}
