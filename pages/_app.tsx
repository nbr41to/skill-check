import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.focus();
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
