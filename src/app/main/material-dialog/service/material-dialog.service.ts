
import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MaterialDialogService {
  private apiUrl: string = 'https://readytouse.cloud';

  private materialEndpoints = {
      getMaterialTypeURL: "/Material/v1/GetMaterialType",
      getMaterialStatusURL: "/Material/v1/GetMaterialStatus",
      getUnitTypeURL: "/Material/v1/GetUnit",
      getCurrencyURL: "/Material/v1/GetCurrency",

      addMaterialURL : "/Material/v1/AddMaterial",
      vendorMaterialMapURL :"/Mapping/v1/AddVendorMaterialMapping",
      vendorMaterialMappingDetailsURL :"/VMMappingDetails/v1/AddVendorMaterialMappingDetails",
      uploadDocuments:"/VMMappingDetailsDocument/v1/AddVendorMaterialMappingDetailsDocument?LoginAuditID="
  }


  constructor() { }

  private async axiosPost(url:string,requestBody:any,token:any){
    return axios.post(url, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }
  private async axiosPut(url:string,requestBody:any,token:any){
    return axios.put(url, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }
  [key: string]: any;

  getMaterialType(requestBody: any, token: any) {
    return this.axiosPost (this.apiUrl + this.materialEndpoints.getMaterialTypeURL,requestBody,token);
  }

  getMaterialStatus(requestBody: any, token: any) {
    return this.axiosPost (this.apiUrl + this.materialEndpoints.getMaterialStatusURL,requestBody,token);
  }

  getUnitType(requestBody: any, token: any) {
    return this.axiosPost (this.apiUrl + this.materialEndpoints.getUnitTypeURL,requestBody,token);
  }
  getCurrency(requestBody: any, token: any) {
    return this.axiosPost (this.apiUrl + this.materialEndpoints.getCurrencyURL,requestBody,token);
  }





  saveMaterial(data: any, token: any){
    return this.axiosPut (this.apiUrl + this.materialEndpoints.addMaterialURL,data,token);
  }

  vendorMaterialMapping(data: any, token: any){
    return this.axiosPut (this.apiUrl + this.materialEndpoints.vendorMaterialMapURL,data,token);
  }
  vendorMaterialMappingDetails(data: any, token: any){
    return this.axiosPut (this.apiUrl + this.materialEndpoints.vendorMaterialMappingDetailsURL,data,token);
  }
  uploadDocuments(data:any,LoginAuditID: any, SecretKey: any,PageID:any ,token:any,detailsID:any){
    var endpoint = this.materialEndpoints.uploadDocuments + LoginAuditID+"&SecretKey="+SecretKey+"&PageID="+PageID+"&iDetailsID="+detailsID
    return this.axiosPut (this.apiUrl + endpoint,data,token);
  }
}

