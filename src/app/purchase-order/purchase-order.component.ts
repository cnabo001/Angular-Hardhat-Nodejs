import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import {SolidityServiceService} from '../solidity-service.service';
import {providers, Contract, ethers, Wallet} from 'ethers';
import  contract from '../../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
declare global {
  interface Window {
    ethereum: any;
  }
}



@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  public user_eth_address: any;
  public drugs : any = [];
  public selectedDrug = {
    name: '',
    price: 0,
    quantity: 0
  }
  provider = new providers.Web3Provider(window.ethereum, "any")
  singer: any;
  constract: any = {};
  totalCost: number = 0;
   resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";


  constructor(private soliditySrv: SolidityServiceService) { }

  async ngOnInit(){
    await this.provider.send("eth_requestAccounts", []);
    this.singer = this.provider.getSigner();
    this.user_eth_address = await this.singer.getAddress();
    console.log('this contract: ', contract);
    this.constract = new Contract(this.soliditySrv.resourceAddress, contract.abi, this.singer);

    let d = await this.getDrugs();
    if(d){
      this.drugs = d;
      console.log('d: ', d)
    }
  }

  getDrugs(){
    return new Promise((resolve, reject) => {
      this.constract.getDrugs()
      .then((res: any) => {
        if(res){
          console.log('what: ', res)
          return resolve(res)
        } else {
          return reject('error')
        }
      })
    })
  }

  onSelectChange(value: any){
    console.log('on select change: ', value)
  }

  onQuantityChange(value: any){
    console.log('on quantity change: ', value)
  }

  computeCost(){
    return 5
  }

}
