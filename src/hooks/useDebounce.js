// Source: https://usehooks.com/useDebounce/

import * as React from 'react'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useDebounceFn(fn, delay) {
  const latestFn = React.useRef()
  const [callCount, setCallCount] = React.useState(0)

  React.useEffect(() => {
    latestFn.current = fn
  }, [fn])

  React.useEffect(() => {
    if (callCount > 0) {
      const fire = () => {
        setCallCount(0)
        latestFn.current()
      }

      const id = setTimeout(fire, delay)
      return () => clearTimeout(id)
    }
  }, [callCount, delay])

  return () => setCallCount(callCount => callCount + 1)
}
