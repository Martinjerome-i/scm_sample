import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MaterialaddService {
  private apiUrl: string = 'https://readytouse.cloud';
  private getMaterialTypeURL: string = this.apiUrl + "/Material/v1/GetMaterialType";
  private getMaterialStatusURL: string = this.apiUrl + "/Material/v1/GetMaterialStatus";
  private getNegotiationStatusURL: string = this.apiUrl + "/Material/v1/GetMaterialNegotiationStatus";
  private getMarketTypeURL: string = this.apiUrl + "/Material/v1/GetMarketPrice";
  private getCurrencyURL: string = this.apiUrl+ "/Material/v1/GetCurrency";
  private getUnitTypeURL: string = this.apiUrl + "/Material/v1/GetUnit";
  private getVendorId: string = this.apiUrl+"/Vendor/v1/GetVendor/ID="

  constructor() { }

  getMaterialType(requestBody: any, token: any) {
    return axios.post(this.getMaterialTypeURL, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  getMaterialStatus(token: any, LoginAuditID: any, SecretKey: any, pageId: any) {
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getMaterialStatusURL, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  getNegotiationStatus(token: any, LoginAuditID: any, SecretKey: any, pageId: any) {
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getNegotiationStatusURL, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  getUnitType(requestBody: any, token: any) {
    return axios.post(this.getUnitTypeURL, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  getVendor(token: any, LoginAuditID: any, SecretKey: any, pageId: any, vendorId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getVendorId+vendorId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }


  getMarketPrice(token: any, LoginAuditID: any, SecretKey: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
    }
    return axios.post(this.getMarketTypeURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }


  getCurrency(token: any, LoginAuditID: any, SecretKey: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
    }
    return axios.post(this.getCurrencyURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }
}



