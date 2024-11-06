import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestNegotiationService {
  private apiUrl: string = 'https://readytouse.cloud';
  private vendorsURL: string = this.apiUrl + "/Vendor/v1/GetVendor";


  constructor() { }

  getNegotiationStatus(token:any, LoginAuditID:any, SecretKey:any, pageId:any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorsURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }

  getNegotiationLastData(token:any, LoginAuditID:any, SecretKey:any, pageId:any, detailsID:any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorsURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }

  saveNegotiation(addVendor:any, token:any){

  }
}
