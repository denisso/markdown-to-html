import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import "../asset/prism-okaidia.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
