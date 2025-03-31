import '../styles/globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
