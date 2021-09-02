import * as React from 'react'

import {Input} from 'baseui/input'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import {Block} from 'baseui/block'

import {ModalStateContainer} from './ModalStateContainer'

function ActivityRegisterModal({
  isOpen,
  onClose = () => {},
  onEmailSubmit = () => {},
}) {
  const [email, setEmail] = React.useState('')

  return (
    <ModalStateContainer>
      {({isConfirmationOpen, toggleConfirm}) => (
        <>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            unstable_ModalBackdropScroll={true}
          >
            <ModalHeader>ท่านสนใจเข้าร่วมกิจกรรมลุ้นรับ iPad?</ModalHeader>
            <ModalBody>
              จากการร่วมตอบแบบสอบถามหรือไม่? เพียงกรอกข้อมูล E-mail
              และทำแบบสอบถามให้ครบทุกข้อ
              ก็มีสิทธิ์ได้ลุ้นรับของรางวัลจากทางโครงการ
            </ModalBody>
            <ModalFooter>
              <ModalButton kind="tertiary" onClick={onClose}>
                ยกเลิก
              </ModalButton>
              <ModalButton onClick={() => toggleConfirm(true)} autoFocus>
                ตกลง
              </ModalButton>
            </ModalFooter>
          </Modal>
          <Modal
            unstable_ModalBackdropScroll={true}
            onClose={() => toggleConfirm(false)}
            isOpen={isConfirmationOpen}
          >
            <ModalHeader>เงื่อนไขการลุ้นรับของรางวัล</ModalHeader>
            <ModalBody>
              <ol style={{listStyleType: 'revert', marginLeft: '12px'}}>
                <li>
                  ผู้ร่วมกิจกรรมต้องระบุข้อมูล E-mail สำหรับติดต่อกลับให้ถูกต้อง
                  หากได้เป็นผู้โชคดี ทางทีมงานจะได้สามารถติดต่อกลับได้
                </li>
                <li>
                  ผู้ร่วมกิจกรรมต้องมีช่วงอายุ Gen Z ระหว่าง 16 – 26 ปี เท่านั้น
                </li>
                <li>
                  ผู้ร่วมกิจกรรมจะต้องตอบแบบสอบถามให้ครบทุกข้อ
                  ถึงจะได้ลุ้นรับของรางวัลจากทางโครงการ
                </li>
              </ol>
              <Block height={'12px'} />
              <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                placeholder="your_name@email.com"
                clearOnEscape
                clearable
                type="email"
              />
            </ModalBody>
            <ModalFooter>
              <ModalButton
                kind="tertiary"
                onClick={() => toggleConfirm(false, () => onClose())}
              >
                ยกเลิก
              </ModalButton>
              <ModalButton
                onClick={() => {
                  toggleConfirm(false, () => {
                    onClose()
                    onEmailSubmit(email)
                  })
                }}
              >
                บันทึก
              </ModalButton>
            </ModalFooter>
          </Modal>
        </>
      )}
    </ModalStateContainer>
  )
}

export {ActivityRegisterModal}
