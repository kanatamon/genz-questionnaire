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

export function useReverselyDebounceFn(fn, delay) {
  const latestFn = React.useRef()
  const [callCount, setCallCount] = React.useState(0)

  React.useEffect(() => {
    latestFn.current = fn
  }, [fn])

  React.useEffect(() => {
    if (callCount === 0) {
      return
    }

    if (callCount === 1) {
      latestFn.current()
    }

    const reset = () => {
      setCallCount(0)
    }

    const id = setTimeout(reset, delay)
    return () => clearTimeout(id)
  }, [callCount, delay])

  return () => setCallCount(callCount => callCount + 1)
}
