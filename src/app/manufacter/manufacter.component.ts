import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import {providers, Contract } from 'ethers';
import  contract from '../../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
import { environment } from 'src/environments/environment';

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
  resourceAddress = environment.resourceAddress;
  prvKey = environment.prvKey;
  walletaddress: string = environment.walletaddress;

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
    let process = await this.constract.addDrug(name, price);
    if(process){
      let drugData = await this.constract.getDrugs();
      this.drugs = drugData;
    }
  }

}
