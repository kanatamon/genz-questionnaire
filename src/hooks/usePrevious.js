import * as React from 'react'

export function usePrevious(value) {
  const previousRef = React.useRef()
  React.useEffect(() => {
    previousRef.current = value
  })

  return previousRef.current
}
