import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MaterialListingService {
  private apiUrl: string = 'https://readytouse.cloud';
  private materialsURL: string = this.apiUrl + "/Material/v1/GetMaterial";


  constructor() { }

  getMaterials(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialsURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });

  }
}
