import { Injectable } from '@angular/core';
import { of } from 'rxjs'; // Added for error handling
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
private apiUrl:string='https://readytouse.cloud';
private postUrl:string= this.apiUrl + "/Authenticate/v1/UserLogin";
  constructor() { }

  login(username: string, password: string, token: any){
    var data = {
      "Username":username,
      "Password":password,
      "DeviceType":"DeviceType",
      "BrowserName":"BrowserName",
      "OSFamily":"OSFamily",
      "OSName":"OSName",
      "UserAgent":"UserAgent",
      "IPAddress":"127.0.0.12",
      "AppVersion":"v1.0.0.0"
    }
    console.log("token: " + data.Username);
    console.log("token: " + token);
    return axios.post(this.postUrl, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }
}
