import { Injectable, OnInit } from '@angular/core';
import {providers, Contract, ethers, Wallet} from 'ethers';
import  contract from '../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
import { environment } from 'src/environments/environment';

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
   resourceAddress =  environment.resourceAddress;

  prvKey = environment.prvKey;
  walletaddress: string = environment.walletaddress;
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
