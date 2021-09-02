import {useRouter} from 'next/router'
import * as ClientMemory from '../client-memory'

export function useResetMemory() {
  const router = useRouter()

  const isNewResponding = router.query.isNewResponding !== undefined

  if (isNewResponding) {
    ClientMemory.reset()
  }
}
