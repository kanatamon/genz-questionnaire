import {Paragraph1} from 'baseui/typography'

function SuperHeader({children, ...delegated}) {
  return (
    <header
      {...delegated}
      style={{
        padding: '20px 45.5px',
        backgroundImage:
          'linear-gradient( 109.6deg,  rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )',
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
