import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class VendoraddService {
  private apiUrl:string='https://readytouse.cloud';
  private postUrl:string= this.apiUrl + "/Vendor/v1/AddVendor";
  private materialURL: string = this.apiUrl + "/Material/v1/GetMaterialType";


  constructor() { }
  saveVendor(data: any, token: any){
    return axios.put(this.postUrl, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  getMaterialType(requestBody: any, token: any) {
    return axios.post(this.materialURL, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }


}
