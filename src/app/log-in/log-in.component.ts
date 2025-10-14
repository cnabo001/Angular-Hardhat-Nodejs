import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import {SolidityServiceService} from '../solidity-service.service';
import {providers, Contract} from 'ethers';
import  contract from '../../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
import { environment } from 'src/environments/environment';
declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public user_eth_address: any;
  logInForm: FormGroup = new FormGroup({});
  provider = new providers.Web3Provider(window.ethereum, "any")
  singer: any;
  constract: any = {};
  resourceAddress = environment.resourceAddress;

  users = [];

  constructor(private router : Router, 
    private soliditySrv: SolidityServiceService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.logInForm = this.fb.group({
      email: [],
      password: []
    })
    await this.provider.send("eth_requestAccounts", []);
    this.singer = this.provider.getSigner();
    this.user_eth_address = await this.singer.getAddress();
    console.log('this contract: ', contract);
    this.constract = new Contract(this.resourceAddress, contract.abi, this.singer);

    this.users = await this.constract.getUsers();
  }

  async logIn(){
    console.log('hello: ', this.logInForm.value['email'], this.logInForm.value['password'])
    let user = await this.constract.getUser()
      if(user){
        let url = '';
        switch(user.user_type){
          case 'Manufacter': {
            url = '/manufacter';
            break;
          }
          case 'Distributor': {
            url = '/distributor';
            break;
          }
          case 'Transporter': {
            url = '/transporter';
            break;
          }
          default : {
            url = '/inventory'
          }
            
        }
        this.router.navigate([url]);
      }
    //alert(stringify(body));
  }
  getAccountInfo(username: any, password: any) 
  {
      return new Promise((resolve, reject) => {
      this.constract.getUser(username, password) 
      .then((res:any) => {
        if(res){
          return resolve(res)
        } else{
          return reject("error")
        }
      })

    }); 
  }
}
