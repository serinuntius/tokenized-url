import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import 'react-notifications/lib/notifications.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
