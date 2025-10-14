import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { stringify } from 'querystring';
import {providers, Contract, ethers, Wallet} from 'ethers';
import  contract from '../../../artifacts/contracts/PhramaNet.sol/PharmaNetEth.json';
import usersdata from '../data/users.json';
import { map } from 'rxjs';
import {SolidityServiceService} from '../solidity-service.service';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'stream';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user_types: any[] = [
    {id:"Manufacter"},
    {id:"Distributor"},
    {id: "Transporter"},
    {id: "Retailer"}
  ]
  public user_type: any;
  public user_name: any;
  public user_password: any;
  public address: any;
  public state: any;
  public country: any;
  public user_eth_address: any;
  public registered_info: any;
  private wallet!: Wallet;
  provider = new providers.Web3Provider(window.ethereum, "any")
  usersList = [];
  //provides = new ethers.providers.JsonRpcProvider()
  singer: any;
  constract: any = {};
  resourceAddress = environment.resourceAddress;

  prvKey = environment.prvKey;
  walletaddress: string = environment.walletaddress;

  api = '/api/';

  constructor(private http: HttpClient, private soliditySrv: SolidityServiceService) { }

  async ngOnInit() {
    console.log("this types: ", this.user_types);
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

  onTypeChange(value: any){
    this.user_type = value;
  }

  async register(){
    let body = {
      user_name: this.user_name,
      password: this.user_password,
      address: this.address,
      user_type: this.user_type,
      state: this.state,
      country: this.country
    };
    console.log('body: ', body)
    let process =  await this.constract.registerUser(this.user_name, this.user_password, this.address,
      this.user_type, this.state, this.country)
      console.log('what the process is: ', process);
      if(process){
          // const userslist = [];
          // userslist.push(body)
          // //usersdata = {userslist};
          // const headers = new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'Access-Control-Allow-Origin':'*' 
          // });
          // this.http.post('register', body, {headers: headers})
          // .pipe(map(res => {
          //   console.log('response from http post: ', res)
          // }))
          // .subscribe();
          let user =  await this.getAccountInfo(body.user_name, body.password);
          this.registered_info = user;
          console.log('registered data: ',this.registered_info)
      }
  }


  getAccountInfo(username: any, password: any) 
  {
      return new Promise((resolve, reject) => {
      this.constract.getUsers() 
      .then((res:any) => {
        if(res){
          console.log('indo', res);
          return resolve(res)
        } else{
          return reject("error")
        }
      })

    }); 
  }
}
