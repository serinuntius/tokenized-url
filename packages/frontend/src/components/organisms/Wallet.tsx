import React from 'react';
import { TorusConnectButton } from '@/components/molecules/wallet/Torus';
import { MetamaskConnectButton } from '@/components/molecules/wallet/Metamask';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DeactivateButton } from '@/components/molecules/wallet/Deactivate';

export const Wallet: React.FC = () => {
    const { account } = useWeb3React<Web3Provider>();
    return (
        <div className="my-8">
            {account ? (
                <DeactivateButton />
            ) : (
                <>
                    <MetamaskConnectButton />
                    <TorusConnectButton />
                </>
            )}
        </div>
    );
};
