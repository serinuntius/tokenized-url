import '@nomiclabs/hardhat-ethers';
import {BigNumber} from 'ethers';
import puppeteer from 'puppeteer';
import IPFS from 'ipfs';
import fetch from 'node-fetch';
import {HardhatRuntimeEnvironment} from "hardhat/types";

export async function mint(args: MintArgs, hre: HardhatRuntimeEnvironment) {
    const {name, description, url, tokenId, contract} = args;

    const [account] = await hre.ethers.getSigners();
    const tokenizedUrl = await hre.ethers.getContractAt('TokenizedUrl', contract);
    let totalSupply: BigNumber = await tokenizedUrl.totalSupply();
    console.log(`totalSupply: ${totalSupply.toNumber()}`);

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36';
    await page.emulate({viewport: {width: 1920, height: 1080}, userAgent})
    await page.goto(url)

    if (url.indexOf('twitter.com') > 0) {
        await page.waitForSelector('article')
    }
    const image = await page.screenshot({path: 'assets/1.png', fullPage: false});
    await browser.close();

    const node = await IPFS.create({});
    const imgResult = await node.add((image as Buffer));

    const imgUrl = `https://ipfs.io/ipfs/${imgResult.path}`
    console.log(`imageUrl: ${imgUrl}`);

    // ipfs.ioにキャッシュを乗せるために一度fetchしておく
    await fetch(imgUrl);

    const metadata = {
        name,
        description,
        image: `https://ipfs.io/ipfs/${imgResult.path}`
    }

    const metadataResult = await node.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${metadataResult.path}`;
    console.log(`metadataUrl: ${metadataUrl}`);
    await fetch(metadataUrl);

    const mintTx = await tokenizedUrl.mint(account.address, tokenId, metadataUrl);
    console.log(`mintTx.hash: ${mintTx.hash}`);
    await mintTx.wait(1)

    totalSupply = await tokenizedUrl.totalSupply();
    console.log(`totalSupply: ${totalSupply.toNumber()}`);

    console.log("TokenizedUrl minted");
}
