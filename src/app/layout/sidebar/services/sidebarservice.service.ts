import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SidebarserviceService {
  private apiUrl: string = 'https://readytouse.cloud';
  private getURL: string = this.apiUrl + "/Authenticate/v1/GetMenuLayout";
  private getPrivilegesURL: string = this.apiUrl + "/Authenticate/v1/GetPagePrivileges";
  constructor() { }
  getData(token: any, LoginAuditID: any, SecretKey: any) {
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey
    }
    return axios.post(
       this.getURL, data, {
        headers:{
          "Authorization": "Bearer " + token
        },
      },
    )
  }
  getPrivilegesData(token: any, LoginAuditID: any, SecretKey: any, pageId: any) {
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId,
    }
    console.log(data);
    return axios.post(
       this.getPrivilegesURL, data, {
        headers:{
          "Authorization": "Bearer " + token
        },
      },
    )
  }
  userLogout(token: any, LoginAuditID: any, SecretKey: any) {
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
    }
    console.log(data);
    return axios.post(
       this.getPrivilegesURL, data, {
        headers:{
          "Authorization": "Bearer " + token
        },
      },
    )
  }
}
