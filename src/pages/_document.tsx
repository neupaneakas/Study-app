import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content="#000000" />
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Icons for iOS */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
