import '@nomiclabs/hardhat-ethers';
import {BigNumber} from 'ethers';
import {ethers} from 'hardhat';
import puppeteer from 'puppeteer';
import IPFS from 'ipfs';
import fetch from 'node-fetch';

async function main() {
    const [account] = await ethers.getSigners();
    const url = await ethers.getContractAt('TokenizedUrl', '0x13De85CdA63e334b873EC1316b5f4B40F82C5bF6');
    let totalSupply: BigNumber = await url.totalSupply();
    console.log(totalSupply.toNumber());

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36';
    await page.emulate({viewport: {width: 1920, height: 1080}, userAgent})
    await page.goto('https://twitter.com/wahukusweet/status/1357265061669007362?s=20')
    await page.waitForSelector('article')
    const image = await page.screenshot({path: 'assets/1.png', fullPage: false});
    console.log(image);



    const node = await IPFS.create({});
    const imgResult = await node.add((image as Buffer));

    const imgUrl = `https://ipfs.io/ipfs/${imgResult.path}`
    console.log(imgUrl);

    await fetch(imgUrl);

    const metadata = {
        name: 'Met hamaguchi',
        description: 'The day I met Mr. Hamaguchi for the first time.',
        image: `https://ipfs.io/ipfs/${imgResult.path}`
    }

    const metadataResult = await node.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${metadataResult.path}`;
    console.log(metadataUrl);
    await fetch(metadataUrl);

    const mintTx = await url.mint(account.address, totalSupply.toNumber(), metadataUrl);
    await mintTx.wait(1)

    totalSupply = await url.totalSupply();
    console.log(totalSupply.toNumber());

    await browser.close();


    console.log("TokenizedUrl minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
