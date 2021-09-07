import * as React from 'react'
import {Alert} from 'baseui/icon'
import {Spinner} from 'baseui/spinner'

const BUTTON_VARIANTS = {
  primary: {
    '--text-color': '#ffffff',
    '--front-background-image': `linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)`,
  },
  secondary: {
    '--text-color': '#000000',
    '--front-background-image': `linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)`,
  },
  submit: {
    '--text-color': '#ffffff',
    '--front-background-image': `linear-gradient(to right, #4facfe 0%, #00f2fe 100%)`,
  },
  ghost: {
    '--text-color': '#000000',
    '--front-background-image': `linear-gradient(120deg, #ffffff 0%, #ffffff 100%)`,
  },
}

export function Button({
  children,
  variant = 'primary',
  endEnhancer = null,
  startEnhancer = null,
  isChangeEnhancerOnDisabled = false,
  isLoading = false,
  disabled = false,
  ...delegated
}) {
  const style = BUTTON_VARIANTS[variant]

  return (
    <button
      className="btn-pushable"
      style={style}
      disabled={disabled}
      {...delegated}
    >
      <span className="front">
        {isLoading ? (
          <Spinner size={24} />
        ) : (
          <>
            {isChangeEnhancerOnDisabled && disabled && startEnhancer ? (
              <Alert size={24} />
            ) : (
              startEnhancer
            )}
            {children}
            {isChangeEnhancerOnDisabled && disabled && endEnhancer ? (
              <Alert size={24} />
            ) : (
              endEnhancer
            )}
          </>
        )}
      </span>
    </button>
  )
}
