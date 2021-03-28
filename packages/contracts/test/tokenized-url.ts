import {expect} from 'chai';
import "@nomiclabs/hardhat-waffle";
import {ethers} from "hardhat";
import {Signer} from "ethers";

describe("TokenizedUrl", function () {
    let accounts: Signer[];
    beforeEach(async () => {
        accounts = await ethers.getSigners();
    });


    it("should deploy and mint.", async function () {
        const Url = await ethers.getContractFactory("TokenizedUrl");
        const url = await Url.deploy();
        const test_uri = 'https://example.com';

        await url.deployed();
        expect(await url.totalSupply()).to.equal(0);

        const address = await accounts[0].getAddress();
        await url.mint(address, 0, test_uri);

        expect(await url.ownerOf(0)).to.equal(address);
        expect(await url.totalSupply()).to.equal(1);
        expect(await url.tokenURI(0)).to.equal(test_uri);
    });
});
