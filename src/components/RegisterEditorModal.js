import * as React from 'react'

import {Input} from 'baseui/input'
import {FormControl} from 'baseui/form-control'
import {Block} from 'baseui/block'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'baseui/modal'
import {Checkbox, LABEL_PLACEMENT} from 'baseui/checkbox'
import {Select} from 'baseui/select'
import {Button as BaseButton, KIND, SIZE} from 'baseui/button'
import {Paragraph2} from 'baseui/typography'

import {Button} from './Button'

const PREFIXES_DICTIONARY = {
  นาย: {label: 'นาย', id: '0'},
  นางสาว: {label: 'นางสาว', id: '1'},
  นาง: {label: 'นาง', id: '2'},
  ไม่ระบุ: {label: 'ไม่ระบุ', id: '3'},
}

function convertInitialContactToLocalState(initialContact) {
  return {
    isAcceptPolicy:
      initialContact && initialContact.isAcceptPolicy
        ? initialContact.isAcceptPolicy
        : false,
    email: initialContact && initialContact.email ? initialContact.email : '',
    name: initialContact && initialContact.name ? initialContact.name : '',
    surname:
      initialContact && initialContact.surname ? initialContact.surname : '',
    prefix:
      initialContact && initialContact.prefix
        ? PREFIXES_DICTIONARY[initialContact.prefix]
        : Object.values(PREFIXES_DICTIONARY).at(-1),
  }
}

function generateSubmittingContact({
  isAcceptPolicy = false,
  email = '',
  name = '',
  surname = '',
  prefix = '',
} = {}) {
  return {
    isAcceptPolicy,
    email,
    name,
    surname,
    prefix: typeof prefix === 'object' ? prefix.label : prefix,
  }
}

function RegisterEditorModal({initialContact, isOpen, onClose, onSubmit}) {
  const [contact, setContact] = React.useState(
    convertInitialContactToLocalState(initialContact),
  )

  React.useEffect(() => {
    setContact(convertInitialContactToLocalState(initialContact))
  }, [initialContact])

  const handleOnContactChange = event => {
    const {value, name} = event.target
    setContact(prevContact => ({...prevContact, [name]: value}))
  }

  const handleOnPrefixChange = params => {
    setContact(prevContact => ({...prevContact, prefix: params.option}))
  }

  const handleOnCheckboxChange = event => {
    const {checked, name} = event.target
    setContact(prevContact => ({...prevContact, [name]: checked}))
  }

  const handleOnSaveButtonClick = () => {
    onClose()
    const submittingContact = generateSubmittingContact(contact)
    onSubmit(submittingContact)
  }

  const handleOnClearContactClick = () => {
    onClose()
    const emptyContact = generateSubmittingContact()
    onSubmit(emptyContact)
  }

  const isEitherRequiredFieldOfContactFulfilled =
    contact.email.trim().length > 0 ||
    contact.surname.trim().length > 0 ||
    contact.name.trim().length > 0

  const isNameInputNeedToFillCorrectly =
    isEitherRequiredFieldOfContactFulfilled && contact.name.trim().length === 0

  const isSurnameInputNeedToFillCorrectly =
    isEitherRequiredFieldOfContactFulfilled &&
    contact.surname.trim().length === 0

  const isEmailInputNeededToFillCorrectly =
    isEitherRequiredFieldOfContactFulfilled && !isValidEmail(contact.email)

  const isOkToSubmit =
    isValidEmail(contact.email) &&
    contact.name.trim().length > 0 &&
    contact.surname.trim().length > 0 &&
    contact.isAcceptPolicy

  const isInitialContactExisted =
    typeof initialContact === 'object' &&
    Object.values(initialContact).every(Boolean)

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
            ผู้ตอบแบบสอบถามให้ข้อมูล e-mail เพื่อใช้ในการติดต่อเมื่อได้รับรางวัล
            และข้อมูล ชื่อ-นามสกุล ที่ถูกต้องตามบัตรประจำตัวประชาชน
            และต้องมีอายุระหว่าง 16-26 ปี ก่อนวันที่ 24 ธันวาคม 2564
            ต้องมีสัญชาติไทย และอาศัยอยู่ในประเทศไทย เท่านั้น
          </li>
          <li>ผู้ตอบแบบสอบถาม 1 ท่าน ตอบแบบสอบถามได้เพียง 1 ชุด เท่านั้น</li>
          <li>
            ผู้ตอบแบบสอบถามที่ได้รับรางวัลจะได้รับแจ้ง e-mail
            และต้องติดต่อรับรางวัล ภายในวันจันทร์ที่ 10 มกราคม 2565 ก่อนเวลา
            16.00 น. พร้อมแนบหลักฐานยืนยันตัวตนตาม ชื่อ-นามสกุล
            ที่ได้ให้ไว้ในขั้นตอนการลงทะเบียน และไม่สามารถโอนสิทธิ์ให้ผุ้อื่นได้
          </li>
          <li>
            ทีมงานจะไม่รับผิดชอบต่อความชำรุดบกพร่องเกี่ยวกับของรางวัล
            ตลอดจนความเสียหายใดๆ ที่เกิดขึ้นกับของรางวัล
          </li>
          <li>
            ทีมงานจะไม่รับภาระและ/หรือรับผิดชอบต่อค่าใช้จ่ายเดินทาง ค่าที่พัก
            และ/หรือค่าใช้จ่ายอื่นๆ ในการมารับของรางวัลของผู้ได้รับรางวัล
            ทั้งนี้ ผู้ได้รับรางวัลต้องเป็นผู้รับผิดชอบเองทั้งหมด
          </li>
          <li>
            ทีมงานมีสิทธิ์เปลี่ยนแปลง ปฏิเสธ ยกเลิก หรือหยุดกิจกรรมได้โดยชอบธรรม
            และไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า ทั้งนี้ ผู้เข้าร่วมกิจกรรม
            ไม่มีสิทธิ์ในการเรียกร้อง
            หรือร้องขอผลจากการสูญเสียหรือความเสียหายที่เกิดขึ้นทางตรงและทางอ้อมจากทีมงาน{' '}
          </li>
          <li>
            ผู้ที่ได้รับรางวัลยินยอมให้ทางทีมงานพิมพ์และ/หรือเผยแพร่รายชื่อ
            และ/หรือรูปถ่ายของผู้ที่ได้รับรางวัลเพื่อการโฆษณาและประชาสัมพันธ์ในปัจจุบันและ/หรือในอนาคตตามที่เห็นสมควร
          </li>
          <li>ของรางวัลไม่สามารถแลกหรือเปลี่ยนมูลค่าเป็นเงินสดได้</li>
          <li>
            ทีมงานขอสงวนสิทธิ์มอบรางวัลเฉพาะผู้ที่ปฏิบัติตามเงื่อนไขที่กำหนดไว้เท่านั้น
          </li>
          <li>
            ทีมงานขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข และสิทธิประโยชน์ต่าง ๆ
            โดยมิต้องแจ้งให้ทราบล่วงหน้า
          </li>
          <li>การประกาศรายชื่อผู้ได้รับรางวัลถือเป็นที่สิ้นสุด</li>
        </ol>
        <Block height={'16px'} />
        <FormControl label={() => 'คำนำหน้าชื่อ'}>
          <Select
            clearable={false}
            options={Object.values(PREFIXES_DICTIONARY)}
            value={[contact.prefix]}
            searchable={false}
            placeholder="คำนำหน้าชื่อ"
            onChange={handleOnPrefixChange}
          />
        </FormControl>
        <FormControl
          label={() => 'ชื่อ'}
          caption={() =>
            isNameInputNeedToFillCorrectly ? 'กรุณาใส่ ชื่อ' : null
          }
          positive={contact.name.trim().length > 0}
          error={isNameInputNeedToFillCorrectly}
        >
          <Input
            name="name"
            value={contact.name}
            onChange={handleOnContactChange}
            placeholder="ชื่อ"
            clearOnEscape
            type="text"
          />
        </FormControl>
        <FormControl
          label={() => 'นามสกุล'}
          caption={() =>
            isSurnameInputNeedToFillCorrectly ? 'กรุณาใส่ นามสกุล' : null
          }
          positive={contact.surname.trim().length > 0}
          error={isSurnameInputNeedToFillCorrectly}
        >
          <Input
            name="surname"
            value={contact.surname}
            onChange={handleOnContactChange}
            placeholder="นามสกุล"
            clearOnEscape
            type="text"
          />
        </FormControl>

        <FormControl
          label={() => 'E-mail'}
          caption={() =>
            isEmailInputNeededToFillCorrectly
              ? 'รูปแบบ e-mail ไม่ถูกต้อง กรุณาใช้ e-mail ที่ถูกต้อง เช่น example@email.org'
              : null
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
            type="email"
          />
        </FormControl>
        <Block height={'12px'} />

        <Checkbox
          name="isAcceptPolicy"
          labelPlacement={LABEL_PLACEMENT.right}
          checked={contact.isAcceptPolicy}
          onChange={handleOnCheckboxChange}
        >
          <p style={{fontSize: '14px'}}>
            ข้าพเจ้าได้อ่านและเข้าใจข้อความดีแล้ว
            ตกลงยินยอมที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขที่ระบุไว้ข้างต้นทุกประการ
          </p>
        </Checkbox>
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
