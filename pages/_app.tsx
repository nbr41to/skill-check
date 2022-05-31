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
        <meta property='og:url' content='https://skill-checker.vercel.app/' />
        <meta property='og:title' content='SKILL CHECKER' />
        <meta property='description' content='例のあれ' />
        <meta property='og:site_name' content='SKILL CHECKER' />
        <meta property='og:image' content='ogp.png' />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
