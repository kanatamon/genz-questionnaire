import {getData} from './http-tools'

export async function checkCanUserUseContact(contact) {
  const contactAvailabilityResult = await getData(
    '/api/contact-availability',
    contact,
  )
  const isOk = contactAvailabilityResult?.isOk ?? false
  return {
    isOk: isOk,
    errorMessage: !isOk
      ? contactAvailabilityResult?.message ?? 'Something went wrong'
      : null,
  }
}
