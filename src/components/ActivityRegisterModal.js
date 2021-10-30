import * as React from 'react'

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'baseui/modal'

import {ModalStateContainer} from './ModalStateContainer'
import {RegisterEditorModal} from './RegisterEditorModal'
import {Button} from './Button'

function ActivityRegisterModal({
  isOpen,
  onClose = () => {},
  onSubmit = () => {},
}) {
  return (
    <ModalStateContainer>
      {({isConfirmationOpen, toggleConfirm}) => (
        <>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            unstable_ModalBackdropScroll={true}
          >
            <ModalHeader>
              ท่านสนใจเข้าร่วมกิจกรรมสุ่มเพื่อรับของรางวัลหรือไม่?
            </ModalHeader>
            <ModalBody>
              เพียงกรอกข้อมูล E-mail และทำแบบสอบถามให้ครบทุกข้อ
              ก็มีสิทธิ์ได้ลุ้นรับของรางวัลจากทางโครงการ
            </ModalBody>
            <ModalFooter>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: '16px',
                }}
              >
                <Button onClick={() => toggleConfirm(true)} autoFocus>
                  เข้าร่วมกิจกรรม
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  ไม่เข้าร่วมกิจกรรม
                </Button>
              </div>
            </ModalFooter>
          </Modal>
          <RegisterEditorModal
            isOpen={isConfirmationOpen}
            onClose={() => toggleConfirm(false)}
            onSubmit={contact => {
              toggleConfirm(false, () => {
                onClose()
                onSubmit(contact)
              })
            }}
          />
        </>
      )}
    </ModalStateContainer>
  )
}

export {ActivityRegisterModal}
