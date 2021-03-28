import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import 'react-notifications/lib/notifications.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { NotificationContainer } from 'react-notifications';

function getLibrary(provider: any) {
    return new Web3Provider(provider);
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <RecoilRoot>
                <Component {...pageProps} />
                <NotificationContainer />
            </RecoilRoot>
        </Web3ReactProvider>
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
