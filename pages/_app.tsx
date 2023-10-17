import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/themes/light-theme-options';
import '../styles/globals.css';

import MainLayout from '../components/layouts/main-layout/main-layout';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Script from 'next/script';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const queryClient = new QueryClient();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Head>
            <title>GeoMasters - Геодезически услуги в цялата страна</title>
            <meta
              name="description"
              content="Трасиране на имоти, геодезически заснемания, промени в кадастъра, инвестиционни проекти, изготвяне на ПУП и много други други. Свържете се с нас, за повече информация "
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="google-site-verification" content="dJDYCa-2v46dTDVSW6xoYtvR2fdm41tHn9XMY1UF9A4" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-QXEE75XRCH"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
          </Script>
          <Script id="hotjar-analytics" strategy="afterInteractive">
            {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3409866,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
          </Script>

          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          ></Script>

          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            autoHideDuration={3000}
          >
            <QueryClientProvider client={queryClient}>
              <SessionProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </SessionProvider>
            </QueryClientProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
