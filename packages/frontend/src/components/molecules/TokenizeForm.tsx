import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import classNames from 'classnames';
import { TokenizedUrl__factory } from '@/types/index';
import { NotificationManager } from 'react-notifications';
import Link from 'next/link';
import { Spinner } from '@/components/atoms/Sippiner';

export const TokenizedForm: React.FC = () => {
    const { account, library } = useWeb3React<Web3Provider>();
    const [tokenizeUrl, setTokenizeUrl] = React.useState('');
    const [explorerUrl, setExplorerUrl] = React.useState('');
    const [isMinting, setIsMinting] = React.useState(false);
    const hasNoAccount = !account;

    const formKlass = classNames('items-center', {
        'opacity-30': hasNoAccount,
    });
    const tokenizedButtonKlass = classNames(
        'bg-blue-600 m-4 px-6 py-2 rounded-full text-white'
    );

    const tokenizedHandler = async () => {
        if (!library || !account || isMinting) return;
        if (!tokenizeUrl) {
            NotificationManager.error('tokenize url is required.');
            return;
        }

        setIsMinting(true);
        const signer = library.getSigner();
        const token = new TokenizedUrl__factory(signer).attach(
            '0x13De85CdA63e334b873EC1316b5f4B40F82C5bF6'
        );

        const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({ url: tokenizeUrl }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!uploadRes.ok) {
            NotificationManager.error('Failed to get url.');
            return;
        }
        const { metadataUrl }: { metadataUrl: string } = await uploadRes.json();

        const totalSupply = await token.totalSupply();

        const tx = await token.mint(
            account,
            totalSupply.toNumber(),
            metadataUrl
        );
        NotificationManager.info(`minting... ${tx.hash}`);
        await tx.wait(1);
        NotificationManager.success('Successfully minted!');

        setExplorerUrl(`https://explorer-mainnet.maticvigil.com/tx/${tx.hash}`);
        setIsMinting(false);
    };

    const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setTokenizeUrl(url);
    };

    return (
        <div className={formKlass}>
            <label htmlFor="url">
                <input
                    id="url"
                    className="bg-gray-300 w-1/2 py-2 px-4 rounded-full"
                    placeholder="https://twitter.com/..."
                    disabled={hasNoAccount}
                    onChange={textChangeHandler}
                />
            </label>

            <button
                className={tokenizedButtonKlass}
                disabled={hasNoAccount || isMinting}
                type="button"
                onClick={tokenizedHandler}
            >
                <span className="flex flex-row gap-2 items-center">
                    {isMinting ? <Spinner /> : <></>}
                    tokenized
                </span>
            </button>
            {explorerUrl ? (
                <Link href={explorerUrl}>
                    <a className="underline text-blue-800">explorer</a>
                </Link>
            ) : (
                <></>
            )}
        </div>
    );
};
