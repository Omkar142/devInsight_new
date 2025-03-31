// client/src/pages/_app.js
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/redux/store';
import '@/styles/globals.scss';
import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
