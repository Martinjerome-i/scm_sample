import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class VendorMaterialService {

  private apiUrl: string = 'https://readytouse.cloud';
  private vendorListURL: string = this.apiUrl + "/Vendor/v1/GetVendor";
  private materialListURL: string = this.apiUrl + "/Material/v1/GetMaterial";
  private vendorIdURL: string = this.apiUrl + "/Vendor/v1/GetVendor/ID=";
  private materialIdURL: string = this.apiUrl + "/Material/v1/GetMaterial/ID=";
  private vendorDataIdURL: string = this.apiUrl + "/VMMappingDetails/v1/GetVendorMaterialMappingDetails/VendorID=";
  private materialDataIdURL: string = this.apiUrl + "/VMMappingDetails/v1/GetVendorMaterialMappingDetails/MaterialID=";
  private getMaterialPaymentTermsURL: string = this.apiUrl + "/Material/v1/GetMaterialPaymentTerms";
  private changePaymentTermsURL: string = this.apiUrl + "/VMMappingDetails/v1/UpdateVendorMaterialPaymentTermsDetails";

  // Market Price Upload
  private marketPriceUploadURL: string = this.apiUrl + "/MarketPrice/v1/UploadMarketPrice?LoginAuditID=";

  constructor() { }

  private async axiosPut(url:string,requestBody:any,token:any){
    return axios.put(url, requestBody, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  // All Vendor List
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getVendorList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorListURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // All Material List
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getMaterialList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialListURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Vendor ID based on Mapping ID / Detail ID
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getVendorDataId(token: any, LoginAuditID: any, SecretKey: any, pageId: any, id: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorDataIdURL+id,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Material ID based on Mapping ID / Detail ID
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getMaterialDataId(token: any, LoginAuditID: any, SecretKey: any, pageId: any, id: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialDataIdURL+id,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Vendor data based on Vendor ID
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getVendorId(token: any, LoginAuditID: any, SecretKey: any, pageId: any, id: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorIdURL+id,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Material data based on Material ID
  // ( Sainath kishore Assigned on 02-03-2024 )
  // ( Sainath kishore Completed on 03-03-2024 )
  getMaterialId(token: any, LoginAuditID: any, SecretKey: any, pageId: any, id: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.materialIdURL+id,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Payment Terms DropDown List
  // ( Sainath kishore Assigned on 04-03-2024 )
  // ( Sainath kishore Completed on 05-03-2024 )
  getMaterialPaymentTerms(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getMaterialPaymentTermsURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Change Payment Terms
  // ( Sainath kishore Assigned on 04-03-2024 )
  // ( Sainath kishore Completed on 05-03-2024 )
  addMaterialPaymentTerms(data: any, token: any){
    return axios.post(this.changePaymentTermsURL, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  // Get All Vendor-Material Qualification List

  // Update Specific Vendor-Material Qualification Data Using Vendor-Material Qualification ID

  // Save / Update Vendor-Material Qualification Data ( This Works Only For Admin )

  // Proceed to Qualification ( Approval Process ) of Vendor-Material Qualification All List ( This Works Only for QA Team )

  // Reject the Qualification of Vendor-Material Qualification All List ( This Works Only for QA Team )

  // Market Price Upload .xls or .csv File API
  // ( Sainath kishore Assigned on 06-03-2024 )
  // ( Sainath kishore Completed on  )
  uploadMarketPrice(data:FormData,LoginAuditID: any, SecretKey: any,PageID:any ,token:any){
    console.log(data.getAll("UploadFile"))
    var endpoint = this.marketPriceUploadURL + LoginAuditID+"&SecretKey="+SecretKey+"&PageID="+PageID
    return this.axiosPut(endpoint,data,token);
  }

  // Save Vendor
  // ( Dhaya Assigned on 06-03-2024 )
  // ( Dhaya Completed on  )

  // Save Material
  // ( Sailesh Assigned on 06-03-2024 )
  // ( Sailesh Completed on  )

  // Save Material and Vendor Mapping Process
  // ( Sailesh Assigned on 06-03-2024 )
  // ( Sailesh Completed on  )

  // Save Material and Vendor Details
  // ( Sailesh Assigned on 06-03-2024 )
  // ( Sailesh Completed on  )

  // Save Material and Vendor Documents
  // ( Sailesh Assigned on 06-03-2024 )
  // ( Sailesh Completed on  )

  // List Material and Vendor Documents
  // ( Dhaya Assigned on 06-03-2024 )
  // ( Dhaya Completed on  )

}
