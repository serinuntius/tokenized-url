import React from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { torus } from '@/lib/web3/connectors';

export const TorusConnectButton: React.FC = () => {
    const { activate, account, deactivate } = useWeb3React<Web3Provider>();
    const connectWalletHandler = async () => {
        try {
            await activate(torus);
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
                className="rounded-full bg-blue-600 text-white p-4 px-8 mx-4"
            >
                {account}
            </button>
        );
    }

    return (
        <button
            onClick={connectWalletHandler}
            className="rounded-full bg-blue-600 text-white p-4 px-8 mx-4"
        >
            torus connect
        </button>
    );
};
