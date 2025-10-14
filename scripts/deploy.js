const hre = require("hardhat");
const ethers = require('ethers');
const fs = require('fs/promises');
const { stringify } = require("querystring");

async function main(){
    const tokenName = 'PharmaCoin';
    const tokenSupply = 1000000000;
    const tokenDecimal = 0;
    const tokenSymbol = 'PHARMA';

    const PharmaCoin = await hre.ethers.getContractFactory("PharmaToken");
    const coin = await PharmaCoin.deploy(tokenSupply, tokenName, tokenDecimal, tokenSymbol);
    await coin.deployed();

    const PharmaNetEth = await hre.ethers.getContractFactory(
        "PharmaNetEth"
    );

    const pharmanet = await PharmaNetEth.deploy(coin.address);

    await pharmanet.deployed();

    console.log("Pharmanet deployed address: " + pharmanet.address);
}

main().then(() => process.exit(0))
.catch((err) => {
    console.error(err);
    process.exit(1);
})

