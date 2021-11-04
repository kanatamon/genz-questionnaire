import * as React from 'react'

import {Notification, KIND} from 'baseui/notification'
import {SIZE} from 'baseui/input'
import {Modal, ModalHeader, ModalBody, ModalFooter, ROLE} from 'baseui/modal'
import {AnimatePresence} from 'framer-motion'

import Image from 'next/image'

import * as QuestionnairesService from '../services/questionnaires'
import * as ClientMemory from '../client-memory'

import IdleGraphic from '../../public/undraw_steps_re_odoy.svg'
import SuccessGraphic from '../../public/undraw_completed_steps_re_h9wc.svg'

import {Button} from './Button'
import {SproutMotionWrapper} from './SproutMotionWrapper'

const IDLE = 'idle'
const PENDING = 'pending'
const SUCCESS = 'success'
const FAILURE = 'failure'

function SubmitConfirmationModal({isOpen, onClose}) {
  const [submittingStatus, setSubmittingStatus] = React.useState(IDLE)

  React.useEffect(
    function () {
      if (submittingStatus === SUCCESS) {
        ClientMemory.resetAll()
      }
    },
    [submittingStatus],
  )

  const handleOnSubmitAllRespondingsToServer = async () => {
    setSubmittingStatus(PENDING)

    const submittingResult =
      await QuestionnairesService.submitAllRespondingsToServer()

    const submittingStatus = submittingResult.isSuccess ? SUCCESS : FAILURE
    setSubmittingStatus(submittingStatus)
  }

  const isModalCloseable = submittingStatus !== SUCCESS

  return (
    <Modal
      unstable_ModalBackdropScroll={true}
      closeable={isModalCloseable}
      onClose={onClose}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>
        {submittingStatus !== SUCCESS ? 'ส่งแบบสอบถาม' : 'ส่งแบบสอบถามสำเร็จ'}
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {submittingStatus !== SUCCESS ? (
            <p style={{textAlign: 'justify'}}>
              ทีมวิจัยขอขอบคุณท่านที่ทำแบบสอบถามในครั้งนี้ กรุณากด
              &quot;ย้อนกลับ&quot; หากท่านต้องการแก้ไขคำตอบ กรุณากด
              &quot;ยืนยันส่งคำตอบ&quot; หากท่านตอบแบบสอบถามเสร็จสมบูรณ์แล้ว
              ทั้งนี้ ท่านจะไม่สามารถแก้ไขคำตอบได้อีก
            </p>
          ) : (
            <p>
              ทีมวิจัยขอขอบคุณท่านที่ทำแบบสอบถามในครั้งนี้
              คำตอบของท่านถูกส่งเรียบร้อยแล้ว
            </p>
          )}

          <Image
            src={submittingStatus !== SUCCESS ? IdleGraphic : SuccessGraphic}
            alt="success"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <AnimatePresence exitBeforeEnter>
          {submittingStatus === FAILURE ? (
            <SproutMotionWrapper
              key="submit-button"
              style={{marginBottom: '24px'}}
            >
              <Notification
                kind={KIND.negative}
                overrides={{
                  Body: {style: {width: 'auto'}},
                }}
              >
                ขออภัย โปรดลองใหม่อีกครั้ง
              </Notification>
            </SproutMotionWrapper>
          ) : null}
        </AnimatePresence>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '16px',
          }}
        >
          <div style={{flex: 1}}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {submittingStatus !== SUCCESS ? (
                <SproutMotionWrapper key="submit-button">
                  <Button
                    disabled={submittingStatus === PENDING}
                    isLoading={submittingStatus === PENDING}
                    variant="submit"
                    onClick={handleOnSubmitAllRespondingsToServer}
                    autoFocus
                  >
                    ยืนยันส่งคำตอบ
                  </Button>
                </SproutMotionWrapper>
              ) : null}
            </AnimatePresence>
          </div>
          <div style={{flex: 1}}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {submittingStatus !== SUCCESS ? (
                <SproutMotionWrapper key="back-button">
                  <Button
                    disabled={submittingStatus === PENDING}
                    variant="ghost"
                    onClick={onClose}
                  >
                    ย้อนกลับ
                  </Button>
                </SproutMotionWrapper>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export {SubmitConfirmationModal}
