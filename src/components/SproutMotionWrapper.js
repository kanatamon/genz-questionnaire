import * as React from 'react'
import {motion} from 'framer-motion'

export function SproutMotionWrapper({children, ...delegated}) {
  return (
    <motion.div
      {...delegated}
      transition={{type: 'spring', stiffness: 100, duration: 1}}
      initial="enter"
      animate="visible"
      exit="exit"
      variants={{
        enter: {
          opacity: 0,
          scale: 0,
        },
        visible: {
          opacity: 1,
          scale: 1,
        },
        exit: {
          opacity: 0,
          scale: 0,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
