import * as React from 'react'

import {AppNavBar} from 'baseui/app-nav-bar'
import {ChevronRight} from 'baseui/icon'
import {Label1, Paragraph3} from 'baseui/typography'

import Link from 'next/link'
import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../questionnaires-utils'
import * as ClientMemory from '../client-memory'

import {ActivityRegisterModal} from './ActivityRegisterModal'
import {RegisterEditorModal} from './RegisterEditorModal'

function MainNavigation({title, subtitle}) {
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

  React.useLayoutEffect(function GREEDY_EXTEND_SPACE_FOR_APP_NAME() {
    /*
    IMPORTANT NOTE: Due to the requirement, the main-nav-element includes only
    2 components [app-name, profile].And the app-name need as much space as
    possible to fit its long content. And with the Base-UI's lib doesn't provide
    any utilization to reach that requirement. So, we intent to touch the DOM
    directly by;

    1. Set outer container of the app-name-element to consume the whole rest space.
    2. Removing the unused space of the outer container of primary-menu-element
       by setting width to 0px.
    */
    const baseSelector = `[data-baseweb="app-nav-bar"] > *:nth-child(2) > *:first-child > *:first-child`

    const appNameEl = document.querySelector(`${baseSelector} > *:nth-child(1)`)
    const primaryMenuEl = document.querySelector(
      `${baseSelector} > *:nth-child(2)`,
    )

    if (appNameEl && primaryMenuEl) {
      appNameEl.style = 'flex: 1;'
      primaryMenuEl.style = 'width: 0px;'
    }
  })

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
            <a>
              <Label1>{title}</Label1>
              {subtitle ? <Paragraph3>{subtitle}</Paragraph3> : null}
            </a>
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
        overrides={{
          AppName: {
            style: ({$theme}) => ({}),
          },
        }}
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
