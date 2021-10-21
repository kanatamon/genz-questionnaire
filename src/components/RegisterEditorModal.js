import * as React from 'react'

import {Input} from 'baseui/input'
import {FormControl} from 'baseui/form-control'
import {Block} from 'baseui/block'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'baseui/modal'

import {Button} from './Button'
import {Button as BaseButton, KIND, SIZE} from 'baseui/button'

function RegisterEditorModal({initialContact, isOpen, onClose, onSubmit}) {
  const [contact, setContact] = React.useState({
    email: initialContact && initialContact.email ? initialContact.email : '',
    name: initialContact && initialContact.name ? initialContact.name : '',
  })

  React.useEffect(() => {
    setContact({
      email: initialContact && initialContact.email ? initialContact.email : '',
      name: initialContact && initialContact.name ? initialContact.name : '',
    })
  }, [initialContact])

  const handleOnContactChange = event => {
    const {value, name} = event.target
    setContact(prevContact => ({...prevContact, [name]: value}))
  }

  const handleOnSaveButtonClick = () => {
    onClose()
    onSubmit(contact)
  }

  const handleOnClearContactClick = () => {
    onClose()
    const emptyContact = {email: '', name: ''}
    onSubmit(emptyContact)
  }

  const isEmailInputNeededToFillCorrectly =
    (contact.name.trim().length > 0 || contact.email.trim().length > 0) &&
    !isValidEmail(contact.email)
  const isNameInputNeedToFillCorrectly =
    contact.email.trim().length > 0 && contact.name.trim().length === 0

  const isOkToSubmit =
    isValidEmail(contact.email) && contact.name.trim().length > 0

  const isInitialContactExisted =
    initialContact && initialContact.email && initialContact.name

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
        <FormControl
          label={() => 'E-mail'}
          caption={() =>
            isEmailInputNeededToFillCorrectly
              ? 'รูปแบบ e-mail ไม่ถูกต้อง กรุณาใช้ e-mail ที่ถูกต้อง เช่น example@email.org'
              : 'ใช้สำหรับติดต่อกลับ'
          }
          positive={isValidEmail(contact.email)}
          error={isEmailInputNeededToFillCorrectly}
        >
          <Input
            name="email"
            value={contact.email}
            onChange={handleOnContactChange}
            placeholder="example@email.org"
            clearOnEscape
            clearable
            type="email"
          />
        </FormControl>
        <Block height={'12px'} />
        <FormControl
          label={() => 'ชื่อ-สกุล'}
          caption={() =>
            isNameInputNeedToFillCorrectly
              ? 'กรุณาใส่ ชื่อ-สกุล'
              : 'ใช้สำหรับตรวจสอบกรณีที่ท่านส่งซ้ำ'
          }
          positive={contact.name.trim().length > 0}
          error={isNameInputNeedToFillCorrectly}
        >
          <Input
            name="name"
            value={contact.name}
            onChange={handleOnContactChange}
            placeholder="ชื่อจริง นามสกุล"
            clearOnEscape
            clearable
            type="text"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '24px',
          }}
        >
          <div
            style={{display: 'flex', flexDirection: 'row-reverse', gap: '16px'}}
          >
            <Button disabled={!isOkToSubmit} onClick={handleOnSaveButtonClick}>
              บันทึก
            </Button>
            <Button variant="ghost" onClick={onClose}>
              ปิด
            </Button>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {isInitialContactExisted ? (
              <BaseButton
                onClick={handleOnClearContactClick}
                kind={KIND.tertiary}
                size={SIZE.compact}
                overrides={{
                  BaseButton: {
                    style: {
                      color: '#545454',
                    },
                  },
                }}
              >
                ลบข้อมูลติดต่อ
              </BaseButton>
            ) : null}
          </div>
        </div>
      </ModalFooter>
    </Modal>
  )
}

function isValidEmail(email) {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email,
  )
}

export {RegisterEditorModal}
