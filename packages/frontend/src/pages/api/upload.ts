/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next';
import chrome from 'chrome-aws-lambda';
import IpfsClient from 'ipfs-http-client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.body;
    console.info(url);

    const browser = await chrome.puppeteer.launch({
        args: [...chrome.args], //, '--proxy-server=http://198.13.63.91:3128'
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    const page = await browser.newPage();
    const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36';
    await page.emulate({ viewport: { width: 1920, height: 1080 }, userAgent });
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
    });

    if (url.indexOf('twitter.com') > 0) {
        try {
            await page.waitForSelector('article', { timeout: 3000 });
        } catch (e) {
            console.error(e);
        }
    }
    const title = await page.title();

    const image = await page.screenshot({
        path: `/tmp/1.png`,
        fullPage: true,
    });
    await browser.close();

    // @ts-ignore
    const node = IpfsClient('https://ipfs.infura.io:5001');
    const imgResult = await node.add(image as Buffer);
    await node.pin.add(imgResult.path);

    const imgUrl = `https://ipfs.io/ipfs/${imgResult.path}`;
    console.log(`imageUrl: ${imgUrl}`);

    const metadata = {
        name: title,
        description: url,
        image: imgUrl,
    };

    const metadataResult = await node.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${metadataResult.path}`;
    console.log(`metadataUrl: ${metadataUrl}`);
    await node.pin.add(metadataResult.path);

    res.status(200).json({ metadataUrl });
};
