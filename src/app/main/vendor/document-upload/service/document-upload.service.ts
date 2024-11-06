import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {
  private apiUrl: string = 'https://readytouse.cloud';

  private documentEndpoints = {
      uploadDocuments:"/VMMappingDetailsDocument/v1/AddVendorMaterialMappingDetailsDocument?LoginAuditID="
  }

  constructor() { }
  private async axiosPost(url:string,requestBody:any,token:any){
    return axios.put(url, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }
  [key: string]: any;

  uploadDocuments(data:any,LoginAuditID: any, SecretKey: any,PageID:any ,token:any ,detailsID:any){
    var endpoint = this.documentEndpoints.uploadDocuments + LoginAuditID+"&SecretKey="+SecretKey+"&PageID="+PageID+"&iDetailsID="+detailsID
    return this.axiosPost (this.apiUrl + endpoint,data,token);
  }
}



