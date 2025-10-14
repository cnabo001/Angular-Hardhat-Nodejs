import { Injectable, OnInit } from '@angular/core';
import {providers, Contract, ethers, Wallet} from 'ethers';
import  contract from '../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
declare global {
  interface Window {
    ethereum: any;
  }
}


@Injectable({
  providedIn: 'root'
})
export class SolidityServiceService implements OnInit{
  provider = new providers.Web3Provider(window.ethereum, "any")
  singer: any;
  constract: any = {};
   resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  prvKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
  walletaddress: string = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
  public user_eth_address: any;


  constructor() { }

  async ngOnInit() {
    await this.provider.send("eth_requestAccounts", []);
    this.singer = this.provider.getSigner();
    this.user_eth_address = await this.singer.getAddress();
    this.constract = new Contract(this.resourceAddress, contract.abi, this.singer);
    //const wallet = await Wallet.fromEncryptedJson(this.wallet, this.prvKey)
    // let users = await this.constract.getUsers()
    
    // users.then((res: any) => {
    //   console.log('what the users is:', res)
    // })

    console.log('signer: ',this.singer.provider.getCode(this.resourceAddress))
  }
}
