import '@nomiclabs/hardhat-ethers';

import {ethers} from 'hardhat';

async function main() {

    const [account] = await ethers.getSigners();


    console.log(`chainId: ${await account.getChainId()}, address: ${account.address} balance: ${await account.getBalance()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
