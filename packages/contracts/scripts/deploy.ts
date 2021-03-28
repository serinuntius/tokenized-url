import '@nomiclabs/hardhat-ethers';
import {ethers} from 'hardhat';

async function main() {

  const Url = await ethers.getContractFactory("TokenizedUrl");
  const url = await Url.deploy();

  await url.deployed();

  console.log("TokenizedUrl deployed to:", url.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
