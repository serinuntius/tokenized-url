import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';

import {HardhatUserConfig, task, types} from "hardhat/config";
import {transfer} from "./scripts/transfer";
import {mint} from './scripts/mint';
import dotenv from 'dotenv';

dotenv.config();

task('transfer', 'token transfer')
    .addParam<string>('to', 'Destination address')
    .addParam<number>('tokenId', 'token id', undefined, types.int)
    .addOptionalParam('contract', 'erc721 contract address', '0x13De85CdA63e334b873EC1316b5f4B40F82C5bF6', types.string)
    .setAction(async (taskArgs: TransferArgs, hre, runSuper) => {
        await transfer(taskArgs, hre);
    })


task('mint', 'mint token')
    .addParam<string>('name', 'token name')
    .addParam<string>('description', 'token description')
    .addParam<string>('url', 'The url you want to tokenize')
    .addParam<number>('tokenId', 'token id', undefined, types.int)
    .addOptionalParam('contract', 'erc721 contract address', '0x13De85CdA63e334b873EC1316b5f4B40F82C5bF6', types.string)
    .setAction(async (taskArgs: MintArgs, hre, runSuper) => {
        await mint(taskArgs, hre);
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

