import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.focus();
    }
  }, []);
  return (
    <>
      <Head>
        <title>SKILL CHECKER</title>
        <meta name='description' content='例のあれ' />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
