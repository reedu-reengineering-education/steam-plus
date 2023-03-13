import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div className="h-full">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
