import * as React from 'react'
import {useRouter} from 'next/router'
import * as SubmitAvailabilityService from '../services/submit-availability'

export function usePreventUserOnSubmitUnavailable() {
  const router = useRouter()
  const routerRef = React.useRef(router)

  React.useLayoutEffect(() => {
    routerRef.current = router
  })

  React.useEffect(() => {
    SubmitAvailabilityService.checkCanUserSubmit().then(canUserSubmitResult => {
      if (!canUserSubmitResult.isOk) {
        routerRef.current?.push('/not-available-submission')
      }
    })
  }, [])
}
