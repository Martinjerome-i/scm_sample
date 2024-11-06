import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../common-services/vendor-listing/vendor.service';
import { response } from 'express';
import { error } from 'console';
import {DatePipe, NgFor} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {
  checkBasedOnVendorCommonInterface,
  VendorData,
  vendorMaterialChecklistDetailsInterface
} from '../../common-interface/common-interface'
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import swal from "sweetalert";

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [NgFor, MatTabsModule, MatPaginatorModule, MatExpansionModule, MatIconModule, MatMenuModule, MatButtonModule, DatePipe],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
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

  answerQuestion(CheckListTemplateID: number) {
    localStorage.setItem('vendorMaterialMappingDetailsID', CheckListTemplateID.toString())
    console.log(CheckListTemplateID.toString())
    // Navigate
    this.router.navigateByUrl('/admin/Checklist/answering');
  }
}
