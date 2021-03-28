import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import IPFS from 'ipfs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36';
    await page.emulate({ viewport: { width: 1920, height: 1080 }, userAgent });
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
    });

    if (url.indexOf('twitter.com') > 0) {
        await page.waitForSelector('article');
    }
    const title = await page.title();

    const image = await page.screenshot({
        path: '/tmp/1.png',
        fullPage: true,
    });
    await browser.close();

    const node = await IPFS.create({});
    const imgResult = await node.add(image as Buffer);

    const imgUrl = `https://ipfs.io/ipfs/${imgResult.path}`;
    console.log(`imageUrl: ${imgUrl}`);

    const metadata = {
        name: title,
        description: url,
        image: `https://ipfs.io/ipfs/${imgResult.path}`,
    };

    const metadataResult = await node.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${metadataResult.path}`;
    console.log(`metadataUrl: ${metadataUrl}`);

    // ipfs.ioにキャッシュを乗せるために一度fetchしておく
    await Promise.all([fetch(imgUrl), fetch(metadataUrl)]);
    await node.stop();
    res.status(200).json({ metadataUrl });
};
