import React from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const DeactivateButton: React.FC = () => {
    const { account, deactivate } = useWeb3React<Web3Provider>();

    const disconnectHandler = () => {
        deactivate();
    };

    return (
        <button
            onClick={disconnectHandler}
            className="rounded-full bg-gray-300 p-4 px-8 mx-4"
        >
            {account}
        </button>
    );
};
