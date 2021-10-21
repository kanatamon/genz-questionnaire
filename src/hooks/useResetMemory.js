import {useRouter} from 'next/router'
import * as ClientMemory from '../client-memory'

export function useResetMemory() {
  const router = useRouter()

  if (router.query.isGetStarted !== undefined) {
    ClientMemory.resetAll()
  } else if (router.query.isGetStartedWithoutClearingContact !== undefined) {
    ClientMemory.resetResponding()
  }
}
