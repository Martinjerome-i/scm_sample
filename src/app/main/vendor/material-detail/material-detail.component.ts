import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  negotiationDataCommonInterface, qualificationCommonInterface,
  qualificationStatusCommonInterface
} from "../../common-interface/common-interface";
import {Router} from "@angular/router";
import {MateriallistService} from "../../common-services/vendor-material-listing/materiallist.service";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import {NegotiationService} from "../../common-services/negotiation/negotiation.service";
import swal from "sweetalert";
@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [MatPaginatorModule, MatMenuModule, MatIconModule, FormsModule, NgForOf, NgIf],
  templateUrl: './material-detail.component.html',
  styleUrl: './material-detail.component.css'
})
export class MaterialDetailComponent {

  negotiationList: negotiationDataCommonInterface [] = [];

  qualificationStatusList: qualificationStatusCommonInterface [] = []

  qualificationStatusJson = [
    {
      "qualificationStatusID": 1,
      "qualificationStatusName": "In-Progress",
    },
    {
      "qualificationStatusID": 2,
      "qualificationStatusName": "Completed",
    },
  ]

  qualificationList: qualificationCommonInterface [] = []
  qualificationListJson = [
    {
      "qualificationID": 1,
      "qualificationName": "Feasibility",
      "qualificationStandard": 6,
      "qualificationActual": 3,
      "qualificationVariation": "50",
      "startedDate": "25-02-2024",
      "qualificationStatus": 1,
    },
    {
      "qualificationID": 2,
      "qualificationName": "Document Request",
      "qualificationStandard": 7,
      "qualificationActual": 10,
      "qualificationVariation": "-30",
      "startedDate": "07-01-2024",
      "qualificationStatus": 1,
    },
    {
      "qualificationID": 3,
      "qualificationName": "Internal Activities of R&D",
      "qualificationStandard": 6,
      "qualificationActual": 5,
      "qualificationVariation": "10",
      "startedDate": "03-03-2024",
      "qualificationStatus": 1,
    },
  ]

  constructor(private router: Router,private vendorMaterialService: VendorMaterialService,private negotiationService: NegotiationService) {
    this.qualificationStatusList = this.qualificationStatusJson.map((item:qualificationStatusCommonInterface) => ({
      "qualificationStatusID": item.qualificationStatusID,
      "qualificationStatusName": item.qualificationStatusName,
    }))
    this.getVendorMaterialDetailsList()
    this.getMaterialVendorQualification()
  }

  async getVendorMaterialDetailsList() {

    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");
      // var VendorId  = localStorage.getItem("VendorId");
      // const response = await this.vendorMaterialService.get(token, LoginAuditID, SecretKey, pageId, detailsID);
      const response = await this.negotiationService.getNegotiationList(token, LoginAuditID, SecretKey, pageId, detailsID);

      console.log(response.data);

      var i = 1;

      this.negotiationList = response.data.map((item:negotiationDataCommonInterface) =>({
        "iteration": i++,
        "VendorMaterialMappingDetailsNegotiationID": item.VendorMaterialMappingDetailsNegotiationID,
        "VendorMaterialMappingDetailsID": item.VendorMaterialMappingDetailsID,
        "VendorID": item.VendorID,
        "CompanyName": item.CompanyName,
        "MaterialID": item.MaterialID,
        "MaterialDescription": item.MaterialDescription,
        "PurchaseRequestNo": item.PurchaseRequestNo,
        "Quantity": item.Quantity,
        "UnitID": item.UnitID,
        "UnitName": item.UnitName,
        "MarketPrice": item.MarketPrice,
        "QuotedPrice": item.QuotedPrice,
        "LeadTime": item.LeadTime,
        "LastNegotiationID": item.LastNegotiationID,
        "NegotiationStatusID": item.NegotiationStatusID,
        "NegotiationStatus": item.NegotiationStatus,
        "StatusColorCode": item.StatusColorCode,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn,
        "SCMOfferPrice": item.SCMOfferPrice,
        "VendorRevisedPrice": item.VendorRevisedPrice
      }));
      // console.log(this.negotiationList[0]);
      // console.log(vendorid)
    }

    catch(error){
      console.log(error);
    }
  }

  private getMaterialVendorQualification() {
    this.qualificationList = this.qualificationListJson.map((item:qualificationCommonInterface) => ({
      "qualificationID": item.qualificationID,
      "qualificationName": item.qualificationName,
      "qualificationStandard": item.qualificationStandard,
      "qualificationActual": item.qualificationActual,
      "qualificationVariation": item.qualificationVariation,
      "startedDate": item.startedDate,
      "qualificationStatus": item.qualificationStatus,
    }))
  }

  setupStatus(qualificationID: number) {
    this.qualificationList[qualificationID-1].qualificationStatus = 2
    swal("Update!", "Qualification Status Changed Successfully!", "success");
  }
}
