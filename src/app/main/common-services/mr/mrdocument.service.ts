import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MRDocumentService {

  private apiUrl: string = 'https://readytouse.cloud';

  // MR List CRUD
  private mrDocumentList: string = this.apiUrl + "/MaterialRequirement/v1/GetMaterialRequirement/BRID=";
  private addMaterialRequirement: string = this.apiUrl + "/MaterialRequirement/v1/AddMaterialRequirement";
  private addMaterialRequirementMaterial: string = this.apiUrl + "/MaterialRequirement/v1/AddMaterialRequirementMaterial";
  private addMaterialRequirementDocumentUpload: string = this.apiUrl + "/MaterialRequirementDocument/v1/AddMaterialRequirementDocument";

  // MR Document List CRUD
  private mrUploadDocumentList: string = this.apiUrl + "/MaterialRequirementDocument/v1/GetMaterialRequirementDocument/ID=";

  constructor() { }


  // Get All MR Document List
  getMRDocumentList(token: any, data: any, brId: any){
    return axios.post(this.mrDocumentList+brId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get All MR Document List
  getMRUploadedDocumentList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, mrId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.mrUploadDocumentList+mrId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Add MR List
  adMRMaterialAdd(data: any, token: any){
    return axios.put(this.addMaterialRequirement,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Add MR Against Material Daa
  adMRMaterialDataAdd(data: any, token: any){
    return axios.put(this.addMaterialRequirementMaterial,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Add MR List
  adMRUploadDocument(url: any, data: any, token: any){
    return axios.put(this.addMaterialRequirementDocumentUpload+url,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }
}
