const {expect} = require("chai");
const {ethers} = require("hardhat");
const resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

describe("PharmaNetEth", async function(){
    const tokenName = 'PharmaCoin';
    const tokenSupply = 1000000000;
    const tokenDecimal = 0;
    const tokenSymbol = 'PHARMA';
    const ContractCoin = await ethers.getContractFactory("PharmaToken");
    const coin = await ContractCoin.deploy(tokenSupply, tokenName, tokenDecimal, tokenSymbol);
    await coin.deployed();

    it("Should register user", async function(){
        const Contract = await ethers.getContractFactory("PharmaNetEth");
        const contract = await Contract.deploy();
        await contract.deployed();

        await contract.constructor(coin.address);

        const registerUserTx = await contract.registerUser(
            'test', 
            '12345', 
            '111 test ave',
            'Distributor',
            'TX',
            'US'
            );
        await registerUserTx.wait();

        expect(await contract.numUsers).to.equal(0);

    });
});