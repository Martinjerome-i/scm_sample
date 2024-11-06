import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {bdDocumentListCommonInterface} from "../../common-interface/common-interface";
import {Router} from "@angular/router";
import {BRDocumentService} from "../../common-services/bd/brdocument-service.service";

@Component({
  selector: 'app-material-requirements-listing',
  standalone: true,
  imports: [
    FormsModule,
    MatGridList,
    MatGridTile,
    ReactiveFormsModule,
    MatPaginator,
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './material-requirements-listing.component.html',
  styleUrl: './material-requirements-listing.component.css'
})
export class MaterialRequirementsListingComponent {

  brDocumentTable: bdDocumentListCommonInterface []= [];
  brDocumentTablePaginate: bdDocumentListCommonInterface []= [];

  status: string;
  category: string;
  roleCode: any

  constructor(private router: Router, private brDocumentService: BRDocumentService){
    this.roleCode = localStorage.getItem("roleCode")
    // alert(this.roleCode)
    this.getBR()
  }

  async getBR(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");


      const response = await this.brDocumentService.getBRDocumentList(token,LoginAuditID,SecretKey,pageId)

      console.log(response.data)

      this.brDocumentTable = response.data.map((item: bdDocumentListCommonInterface) =>  ({
        "BusinessRequirementID": item.BusinessRequirementID,
        "DocumentName": item.DocumentName,
        "Description": item.Description,
        "BusinessRequirementStatusID": item.BusinessRequirementStatusID,
        "BusinessRequirementStatus": item.BusinessRequirementStatus,
        "StatusColorCode": item.StatusColorCode,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn
      }))

      this.brDocumentTablePaginate = this.brDocumentTable.slice(0, 10)
      // this.companyName= response.data.CompanyName;
      // this.vendorID= response.data.VendorID;
      // this.contactName= response.data.ContactName;
      // this.contactNo= response.data.ContactNo;
      // this.status= response.data.VendorStatus;
    }
    catch(error){
      console.log(error)
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.brDocumentTable.length){
      endIndex = this.brDocumentTable.length;
    }
    this.brDocumentTablePaginate = this.brDocumentTable.slice(startIndex, endIndex);
  }

  toMaterialRequirementList(BusinessRequirementID: number) {
    localStorage.setItem("businessRequirementID", BusinessRequirementID.toString());
    this.router.navigateByUrl('/admin/MaterialRequirements/list');
  }
}
