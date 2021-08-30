import App from 'next/app'
import {Provider as StyletronProvider} from 'styletron-react'
import {BaseProvider, LightTheme} from 'baseui'

import {styletron} from '../../styletron'
import '../styles.css'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    )
  }
}
