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
import {VendorData, vendorMaterialChecklistDetailsInterface} from '../../common-interface/common-interface'
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import swal from "sweetalert";



@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [NgFor, MatTabsModule, MatPaginatorModule, MatExpansionModule, MatIconModule, MatMenuModule, MatButtonModule, DatePipe],
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})

export class VendorsComponent {
  vendorList: VendorData [] = [];
  vendorListPaginate: VendorData [] = [];

  checkLisTemplateList: vendorMaterialChecklistDetailsInterface [] = [];
  checkLisTemplateListPaginate: vendorMaterialChecklistDetailsInterface [] = [];

  length: number = 0
  pageSize: number = 10;  //displaying three cards each row
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private router: Router, private vendorService: VendorService, private checklistTemplateService: ChecklistTemplateService) {
    this.getVendor()
    this.getChecklistTemplateList()
  }

  async getVendor(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.vendorService.getVendors(token,LoginAuditID,SecretKey,pageId);

      this.vendorList = response.data.map((item:VendorData) =>({
        "VendorID": item.VendorID,
        "CompanyName": item.CompanyName,
        "ContactName": item.ContactName,
        "ContactNo": item.ContactNo,
        "VendorStatusID": item.VendorStatusID,
        "VendorStatus": item.VendorStatus,
        "StatusColorCode": item.StatusColorCode,
      }));

      this.vendorListPaginate = this.vendorList.slice(0, 10)

      console.log(this.vendorListPaginate);

    }
    catch(error){
      console.log(error);
    }

  }

  async getChecklistTemplateList(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.checklistTemplateService.getVendorDetailsCheckList(token,LoginAuditID,SecretKey,pageId);

      this.checkLisTemplateList = response.data.map((item:vendorMaterialChecklistDetailsInterface) =>({
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
        "CheckListQuestions": item.CheckListQuestions
      }));

      this.checkLisTemplateListPaginate = this.checkLisTemplateList.slice(0, 10)

      console.log(this.vendorListPaginate);

    }
    catch(error){
      console.log(error);
    }

  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.vendorList.length){
      endIndex = this.vendorList.length;
    }
    this.vendorListPaginate = this.vendorList.slice(startIndex, endIndex);
  }

  OnPageChangeChecklist(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.checkLisTemplateList.length){
      endIndex = this.checkLisTemplateList.length;
    }
    this.checkLisTemplateListPaginate = this.checkLisTemplateList.slice(startIndex, endIndex);
  }

  toMaterialList(VendorID: any) {
    localStorage.setItem("vendorId", VendorID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/materialList');
  }

  async deleteCheckList(vendorDetailsCheckListID: number) {

    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      var deleteDataRequest = {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      }

      swal({
        title: "Are you sure?",
        text: "If you deleted the record you'll not get it back",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {
          callFunction(deleteDataRequest, token, vendorDetailsCheckListID)
        } else {
          swal("Cancelled", "Your record is safe", "error");
        }
      });

      const callFunction = (deleteDataRequest: any, token: any, vendorDetailsCheckListID: any) => {
        this.getChecklistTemplateService(deleteDataRequest, token, vendorDetailsCheckListID)
      }
    }
    catch(error){
      console.log(error);
    }
  }

  getChecklistTemplateService(deleteDataRequest: any, token: any, vendorDetailsCheckListID: any) {
    this.checklistTemplateService
      .getVendorDetailsCheckListDelete(deleteDataRequest, token, vendorDetailsCheckListID)
      .then(response => {
        // Login successful
        swal("Success!", "Deleted Record Successfully" , "success");
        this.getChecklistTemplateList()
        // Navigate
        // this.router.navigateByUrl('/admin/Vendor/add');
      })
      .catch((error) => {
        // Handle login errors

        swal({
          title: 'Completed!',
          text: 'Record deleted successfully shortlisted!',
          icon: 'success'
        }).then(function() {
          console.log("working")
        });
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }
}
