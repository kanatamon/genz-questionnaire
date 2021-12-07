import {Paragraph1} from 'baseui/typography'

function SuperHeader({children, ...delegated}) {
  return (
    <header
      {...delegated}
      style={{
        padding: '20px 45.5px',
        background: '#4f3376',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paragraph1 color="white">{children}</Paragraph1>
    </header>
  )
}

export {SuperHeader}
