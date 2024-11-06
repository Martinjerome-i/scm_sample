import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MateriallistService {
  private apiUrl: string = 'https://readytouse.cloud';
  private materialURL: string = this.apiUrl + "/VMMappingDetails/v1/GetVendorMaterialMappingDetails/VendorID=";
  private getvendorURL: string = this.apiUrl + "/Vendor/v1/GetVendor/ID=";

  constructor() { }

  getMaterials(token: any, LoginAuditID: any, SecretKey: any, pageId: any, vendorId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialURL+vendorId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  getVendor(token: any, LoginAuditID: any, SecretKey: any, pageId: any, vendorId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getvendorURL+vendorId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }
}
