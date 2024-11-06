import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class BRDocumentService {

  private apiUrl: string = 'https://readytouse.cloud';

  // BR List CRUD
  private brDocumentList: string = this.apiUrl + "/BusinessRequirement/v1/GetBusinessRequirement";
  private addBusinessRequirement: string = this.apiUrl + "/BusinessRequirement/v1/AddBusinessRequirement";
  private addBusinessRequirementDocumentUpload: string = this.apiUrl + "/BusinessRequirementDocument/v1/AddBusinessRequirementDocument";

  // BR Document List CRUD
  private brUploadDocumentList: string = this.apiUrl + "/BusinessRequirementDocument/v1/GetBusinessRequirementDocument/ID=";

  constructor() { }


  // Get All BR Document List
  getBRDocumentList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.brDocumentList,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get All BR Document List
  getBRUploadedDocumentList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, brId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.brUploadDocumentList+brId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Add BR List
  adBRDocumentAdd(data: any, token: any){
    return axios.put(this.addBusinessRequirement,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Add BR List
  adBRUploadDocument(url: any, data: any, token: any){
    return axios.put(this.addBusinessRequirementDocumentUpload+url,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }
}
