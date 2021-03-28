import '@nomiclabs/hardhat-ethers';
import {HardhatRuntimeEnvironment} from "hardhat/types";

export async function transfer(args: TransferArgs, hre: HardhatRuntimeEnvironment) {
    const {to, contract, tokenId} = args;

    const url = await hre.ethers.getContractAt('TokenizedUrl', contract);

    const [account] = await hre.ethers.getSigners();

    console.log(await url.totalSupply());

    const tx = await url.transferFrom(account.address, to, tokenId);
    console.log(tx.hash);
}

