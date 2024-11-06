import { Injectable } from '@angular/core';

import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class VendorDocumentService {

  private apiUrl: string = 'https://readytouse.cloud';
  private vendorUrl: string= this.apiUrl+'/Vendor/v1/GetVendor/ID='
  private documentUrl: string = this.apiUrl+'/VMMappingDetailsDocument/v1/GetVendorMaterialMappingDetailsDocument/DetailsID='
  private materialUrl: string= this.apiUrl+'/Material/v1/GetMaterial/ID='
  constructor() { }

  getVendorList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, ID: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorUrl+ID,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  getDocumentList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, detailsID: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.documentUrl+detailsID,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  getMaterials(token: any, LoginAuditID: any, SecretKey: any, pageId: any, materialId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialUrl+materialId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }
}
