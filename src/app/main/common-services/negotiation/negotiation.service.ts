import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class NegotiationService {

  private apiUrl: string = 'https://readytouse.cloud';
  private negotiationListURL: string = this.apiUrl + "/VMMappingDetailsNegotiation/v1/GetVendorMaterialMappingDetailsNegotiation/DetailsID=";
  private negotiationLastDataURL: string = this.apiUrl + "/VMMappingDetails/v1/GetVendorMaterialMappingDetails/DetailsID=";
  private postUrl: string = this.apiUrl + "/VMMappingDetailsNegotiation/v1/AddVendorMaterialMappingDetailsNegotiation";
  private changeStatus: string = this.apiUrl + "/VMMappingDetailsNegotiation/v1/UpdateVendorMaterialNegotiationStatus/ID=";

  constructor() {
  }

  // Save the Latest Negotiation
  saveNegotiation(data: any, token: any){
    return axios.put(this.postUrl, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  // Get All Negotiation List Based on Vendor-Material Using Detail ID
  getNegotiationList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, detailsID: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.negotiationListURL+detailsID,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get Latest Negotiation Data Based on SCM to Vendor and wise-versa
  getNegotiationLastData(token: any, LoginAuditID: any, SecretKey: any, pageId: any, detailsID: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.negotiationLastDataURL+detailsID,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Change the Negotiation Status Like Approve on-Hold and Reopen
  changeNegotiationStatus(negotiationStatus: any, token: any, statusID: string, detailsID: string) {
    return axios.post(this.changeStatus+detailsID+"&StatusID="+statusID,negotiationStatus,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }
}
