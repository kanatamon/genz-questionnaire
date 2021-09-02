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
      <ModalHeader>โปรดระบุอีเมลของท่าน</ModalHeader>
      <ModalBody>
        <span>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </span>
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
        <ModalButton kind="tertiary" onClick={onClose}>
          ยกเลิก
        </ModalButton>
        <ModalButton
          onClick={() => {
            onClose()
            onSubmit(email)
          }}
        >
          บันทึก
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export {RegisterEditorModal}
