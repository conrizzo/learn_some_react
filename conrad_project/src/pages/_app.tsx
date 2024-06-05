// pages/_app.js or pages/_app.tsx
import '../assets/globals.css' // adjust the path to match where your globals.css file is located
import { AppProps } from 'next/app';
import RootLayout from '../app/layout'

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    )
  }

export default MyApp