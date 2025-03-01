// src/pages/_app.tsx
import Header from '@/components/Header/Header';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Layout } from 'src/components/Layout/Layout';
import { ThemeProvider } from 'src/context/ThemeContext';
import '../App.css';
import store from '../store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
