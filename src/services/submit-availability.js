import {getData} from './http-tools'

export async function checkCanUserSubmit() {
  const submitAvailabilityResult = await getData('/api/submit-availability')
  const isOk = submitAvailabilityResult?.isOk ?? false
  return {
    isOk: isOk,
    errorMessage: !isOk
      ? submitAvailabilityResult?.message ?? 'Something went wrong'
      : null,
  }
}
