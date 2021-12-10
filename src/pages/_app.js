import App from 'next/app'
import Head from 'next/head'

import {Provider as StyletronProvider} from 'styletron-react'
import {BaseProvider, LightTheme, createTheme} from 'baseui'

const primitives = {
  primaryFontFamily: 'Prompt',
}

const theme = createTheme(primitives)

import {styletron} from '../../styletron'
import '../styles.css'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <StyletronProvider value={styletron}>
          <BaseProvider
            theme={theme}
            overrides={{
              AppContainer: {
                style: {
                  height: '100%',
                },
              },
            }}
          >
            <Component {...pageProps} />
          </BaseProvider>
        </StyletronProvider>
      </>
    )
  }
}
