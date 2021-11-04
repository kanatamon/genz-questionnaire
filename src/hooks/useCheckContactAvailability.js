import * as React from 'react'
import * as ContactAvailabilityService from '../services/contact-availability'
import * as EmailDomain from '../domains/email'

const IDLE = 'idle'
const AVAILABLE = 'available'
const UNAVAILABLE = 'unavailable'
const PENDING = 'pending'

export function useCheckContactAvailability(contact) {
  const [status, setStatus] = React.useState(IDLE)

  const {name, surname, email} = contact

  React.useEffect(() => {
    const checkingPartialContact = {name, surname, email}
    if (
      !Object.values(checkingPartialContact).every(Boolean) ||
      !EmailDomain.isValidEmail(email)
    ) {
      setStatus(IDLE)
      return
    }

    setStatus(PENDING)

    ContactAvailabilityService.checkCanUserUseContact(
      checkingPartialContact,
    ).then(canUserUseContactResult =>
      setStatus(canUserUseContactResult.isOk ? AVAILABLE : UNAVAILABLE),
    )
  }, [name, surname, email])

  return {
    status,
    STATUSES: {
      IDLE,
      AVAILABLE,
      UNAVAILABLE,
      PENDING,
    },
  }
}
