import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import {providers, Contract, ethers, Wallet} from 'ethers';
import  contract from '../../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-manufacter',
  templateUrl: './manufacter.component.html',
  styleUrls: ['./manufacter.component.css']
})
export class ManufacterComponent implements OnInit {
  drugs: any = [];
  newDrugForm: FormGroup = new FormGroup({});
  public drugName: string = '';
  public drugPrice: string = ''
  singer: any;
  constract: any = {};
  public user_eth_address: any;
  provider = new providers.Web3Provider(window.ethereum, "any")
   resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  prvKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
  walletaddress: string = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';


  constructor(private fb: FormBuilder) { }

  async ngOnInit() {
    this.newDrugForm = this.fb.group({
      name: [],
      price: []
    })
    await this.provider.send("eth_requestAccounts", []);
    this.singer = this.provider.getSigner();
    this.user_eth_address = await this.singer.getAddress();
    this.constract = new Contract(this.resourceAddress, contract.abi, this.singer);
  }

  async createDrug(){
    let name: any = this.newDrugForm.value['name'];
    let price: any = this.newDrugForm.value['price'];
    console.log('request: ', name, price);
    let process = await this.constract.addDrug(name, price);
    if(process){
      let drugData = await this.constract.getDrugs();
      this.drugs = drugData;
      console.log('and the drugs are: ', drugData);
    }
  }

}
