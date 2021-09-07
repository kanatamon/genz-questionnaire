import * as React from 'react'

import {Input} from 'baseui/input'
import {Block} from 'baseui/block'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'baseui/modal'

import {Button} from './Button'

function RegisterEditorModal({initialEmail, isOpen, onClose, onSubmit}) {
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    setEmail(initialEmail)
  }, [initialEmail])

  return (
    <Modal
      unstable_ModalBackdropScroll={true}
      onClose={onClose}
      isOpen={isOpen}
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
        <div
          style={{display: 'flex', flexDirection: 'row-reverse', gap: '16px'}}
        >
          <Button
            onClick={() => {
              onClose()
              onSubmit(email)
            }}
          >
            บันทึก
          </Button>
          <Button variant="ghost" onClick={onClose}>
            ยกเลิก
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export {RegisterEditorModal}
