import * as React from 'react'

import {Caption1, Paragraph1} from 'baseui/typography'
import {Tag, VARIANT} from 'baseui/tag'

function QuestionHeader({title, description, label}) {
  return (
    <div className="card">
      <Paragraph1>{title}</Paragraph1>
      {/* {label ? (
        <Tag
          closeable={false}
          variant={VARIANT.solid}
          overrides={{
            Root: {
              style: {
                marginTop: '16px',
              },
            },
            Text: {
              style: {
                maxWidth: 'max-content',
              },
            },
          }}
        >
          {label}
        </Tag>
      ) : null} */}
      {description ? (
        <Caption1 $style={{marginTop: '8px', marginBottom: '0px'}}>
          {description}
        </Caption1>
      ) : null}
    </div>
  )
}

export {QuestionHeader}
