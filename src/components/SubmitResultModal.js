import * as React from 'react'

import {KIND as ButtonKind} from 'baseui/button'
import {SIZE} from 'baseui/input'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from 'baseui/modal'

import {useRouter} from 'next/router'
import Image from 'next/image'

import * as QuestionnairesUtils from '../questionnaires-utils'

import SuccessGraphic from '../../public/undraw_Done_re_oak4.svg'

function SubmitResultModal({isOpen, isSuccess, onClose}) {
  const router = useRouter()

  const handleOnSendAnotherButtonClick = () => {
    const getStartedQuestionLink =
      QuestionnairesUtils.generateGetStartedQuestionLink()
    router.push(getStartedQuestionLink)
  }

  return (
    <Modal
      unstable_ModalBackdropScroll={true}
      closeable={!isSuccess}
      onClose={onClose}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>ส่งแบบสอบถามสำเร็จ</ModalHeader>
      <ModalBody>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <p>
            ขอบคุณที่ร่วมตอบแบบสอบถาม &quot;ปัญหา (Pain Point) และความต้องการ
            (Gain Point) ของ Gen Z
            ในด้านรูปแบบการจัดการเรียนรู้และหลักสูตร&quot;
          </p>
          <Image src={SuccessGraphic} alt="success" />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={handleOnSendAnotherButtonClick}
        >
          ส่งคำตอบอีกครั้ง
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export {SubmitResultModal}
