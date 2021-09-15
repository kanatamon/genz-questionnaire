import * as React from 'react'

export function usePrevious(value) {
  const currentValueRef = React.useRef(value)
  const previousValueRef = React.useRef()

  if (currentValueRef.current !== value) {
    previousValueRef.current = currentValueRef.current
    currentValueRef.current = value
  }

  return previousValueRef.current
}
