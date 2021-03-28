import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';

import {HardhatUserConfig, task, types} from "hardhat/config";
import {transfer} from "./scripts/transfer";
import dotenv from 'dotenv';
dotenv.config();

interface TransferArgs {
    to: string;
    contract: string;
    tokenId: number;
}
task('transfer', 'token transfer')
    .addParam<string>('to', 'Destination address')
    .addParam<number>('tokenId', 'token id', undefined, types.int)
    .addOptionalParam('contract', 'erc721 contract address', '0x13De85CdA63e334b873EC1316b5f4B40F82C5bF6', types.string)
    .setAction(async (taskArgs: TransferArgs, hre, runSuper)=> {
        const {to, contract, tokenId} = taskArgs;
        await transfer(to, tokenId, contract, hre);
})


const config: HardhatUserConfig = {
    solidity: "0.7.6",
    defaultNetwork: 'localhost',
    networks: {
        matic: {
            url: 'https://rpc-mainnet.maticvigil.com/',
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
        },
        localhost: {
            url: 'http://localhost:8545',
        }
    }
}

export default config;

