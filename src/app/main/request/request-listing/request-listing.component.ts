import { Component } from '@angular/core';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {DatePipe, NgFor, NgForOf} from "@angular/common";
import {checkBasedOnVendorCommonInterface, checklistCommonInterface} from "../../common-interface/common-interface";
import {Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";

@Component({
  selector: 'app-request-listing',
  standalone: true,
  imports: [NgFor, MatTabsModule, MatPaginatorModule, MatExpansionModule, MatIconModule, MatMenuModule, MatButtonModule, DatePipe],
  templateUrl: './request-listing.component.html',
  styleUrl: './request-listing.component.css'
})
export class RequestListingComponent {
  vendorChecklistList: checkBasedOnVendorCommonInterface [] = [];
  vendorChecklistListPaginate: checkBasedOnVendorCommonInterface [] = [];

  length: number = 0
  pageSize: number = 10;  //displaying three cards each row
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private router: Router, private checklistTemplateService: ChecklistTemplateService) {
    this.getVendorChecklist()
  }

  async getVendorChecklist(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");
      var vendorId= localStorage.getItem("userID");

      const response = await this.checklistTemplateService.getChecklistTemplateVendorBased(token,LoginAuditID,SecretKey,pageId,vendorId);

      this.vendorChecklistList = response.data.map((item:checkBasedOnVendorCommonInterface) =>({
        "VendorDetailsCheckListID": item.VendorDetailsCheckListID,
        "VendorMaterialMappingDetailsID": item.VendorMaterialMappingDetailsID,
        "CheckListTemplateID": item.CheckListTemplateID,
        "TemplateCode": item.TemplateCode,
        "TemplateName": item.TemplateName,
        "VendorDetailsCheckListStatusID": item.VendorDetailsCheckListStatusID,
        "VendorDetailsCheckListStatus": item.VendorDetailsCheckListStatus,
        "StatusColorCode": item.StatusColorCode,
        "VendorID": item.VendorID,
        "CompanyName": item.CompanyName,
        "MaterialID": item.MaterialID,
        "MaterialDescription": item.MaterialDescription,
        "CASNumber": item.CASNumber,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn,
        "CheckListQuestions": []
      }));
      this.vendorChecklistListPaginate = this.vendorChecklistList.slice(0, 10)
      console.log(this.vendorChecklistListPaginate);
    }
    catch(error){
      console.log(error);
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.vendorChecklistList.length){
      endIndex = this.vendorChecklistList.length;
    }
    this.vendorChecklistListPaginate = this.vendorChecklistList.slice(startIndex, endIndex);
  }

  validateAnswers(CheckListTemplateID: number) {
    localStorage.setItem('checkListTemplateID', CheckListTemplateID.toString())
    console.log(CheckListTemplateID.toString())
    // Navigate
    this.router.navigateByUrl('/admin/Request/update');
  }
}
