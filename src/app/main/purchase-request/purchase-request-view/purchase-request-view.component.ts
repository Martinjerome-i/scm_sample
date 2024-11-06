import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import { Router } from '@angular/router';
import {NegotiationService} from "../../common-services/negotiation/negotiation.service";
import swal from "sweetalert";

@Component({
  selector: 'app-purchase-request-view',
  standalone: true,
  imports: [MatPaginatorModule, MatMenuModule, MatIconModule, NgForOf, DatePipe, DecimalPipe, NgIf],
  templateUrl: './purchase-request-view.component.html',
  styleUrl: './purchase-request-view.component.css'
})
export class PurchaseRequestViewComponent {

  // negotiationList: negotiationData [] = [];

  // statusName: string = "";
  // statusId: number = 1;

  // constructor(private router: Router,private negotiationService: NegotiationService) {
  //   this.getNegotiationList()
  // }

  // async getNegotiationList() {

  //   try {
  //     var token = localStorage.getItem("token");
  //     var LoginAuditID = localStorage.getItem("LoginAuditID");
  //     var SecretKey = localStorage.getItem("SecretKey");
  //     var pageId = localStorage.getItem("PageID");
  //     var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");
  //     // var VendorId  = localStorage.getItem("VendorId");
  //     const response = await this.negotiationService.getNegotiationList(token, LoginAuditID, SecretKey, pageId, detailsID);

  //     console.log(response.data);

  //     var i = 1;

  //     this.negotiationList = response.data.map((item:negotiationData) =>({
  //       "iteration": i++,
  //       "VendorMaterialMappingDetailsNegotiationID": item.VendorMaterialMappingDetailsNegotiationID,
  //       "VendorMaterialMappingDetailsID": item.VendorMaterialMappingDetailsID,
  //       "VendorID": item.VendorID,
  //       "CompanyName": item.CompanyName,
  //       "MaterialID": item.MaterialID,
  //       "MaterialDescription": item.MaterialDescription,
  //       "PurchaseRequestNo": item.PurchaseRequestNo,
  //       "Quantity": item.Quantity,
  //       "UnitID": item.UnitID,
  //       "UnitName": item.UnitName,
  //       "MarketPrice": item.MarketPrice,
  //       "QuotedPrice": item.QuotedPrice,
  //       "LeadTime": item.LeadTime,
  //       "LastNegotiationID": item.LastNegotiationID,
  //       "NegotiationStatusID": item.NegotiationStatusID,
  //       "NegotiationStatus": item.NegotiationStatus,
  //       "StatusColorCode": item.StatusColorCode,
  //       "LastUpdatedBy": item.LastUpdatedBy,
  //       "LastUpdatedOn": item.LastUpdatedOn,
  //       "SCMOfferPrice": item.SCMOfferPrice,
  //       "VendorRevisedPrice": item.VendorRevisedPrice
  //     }));
  //     // console.log(this.negotiationList[0]);
  //     console.log(this.negotiationList[0].NegotiationStatusID)
  //     this.statusName = this.negotiationList[0].NegotiationStatus
  //     this.statusId = this.negotiationList[0].NegotiationStatusID
  //     // console.log(vendorid)
  //   }

  //   catch(error){
  //     console.log(error);
  //   }
  // }

  // changeStatus(VendorMaterialMappingDetailsNegotiationID: number, statusId: string) {

  //   var token = localStorage.getItem("token");
  //   var LoginAuditID = localStorage.getItem("LoginAuditID");
  //   var SecretKey = localStorage.getItem("SecretKey");

  //   var negotiationStatus = {
  //     "LoginAuditID": LoginAuditID,
  //     "SecretKey": SecretKey,
  //     "PageID": 3
  //   }
  //   this.negotiationService
  //     .changeNegotiationStatus(negotiationStatus, token, statusId, VendorMaterialMappingDetailsNegotiationID.toString())
  //     .then(response => {
  //       // Status Changed successful
  //       swal("Changed!", "Status Changed Successfully!", "success").then(
  //         value => {
  //           console.log("working")
  //           this.getNegotiationList()
  //         }
  //       );
  //     })
  //     .catch((error: any) => {
  //       // Handle login errors
  //       // this.alertService.error(error);
  //     });
  // }
}
