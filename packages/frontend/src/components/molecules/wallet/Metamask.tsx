import React from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected } from '@/lib/web3/connectors';

export const MetamaskConnectButton: React.FC = () => {
    const { activate, account, deactivate } = useWeb3React<Web3Provider>();
    const connectWalletHandler = async () => {
        try {
            await activate(injected);
        } catch (e) {
            console.error(e);
        }
    };

    const disconnectHandler = () => {
        deactivate();
    };

    if (account) {
        return (
            <button
                onClick={disconnectHandler}
                className="rounded-full bg-yellow-600 p-4 px-8 mx-4"
            >
                {account}
            </button>
        );
    }

    return (
        <button
            onClick={connectWalletHandler}
            className="rounded-full bg-yellow-600 p-4 px-8 mx-4"
        >
            metamask connect
        </button>
    );
};
