import { Component } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MateriallistService } from '../../common-services/vendor-material-listing/materiallist.service';
import {DatePipe, NgForOf} from "@angular/common";
import { Router } from '@angular/router';
import {MatIconButton} from "@angular/material/button";
import { materialData } from '../../common-interface/common-interface';




@Component({
  selector: 'app-materiallist',
  standalone: true,
  imports: [MatPaginatorModule, MatMenuModule, MatIconModule, NgForOf, MatIconButton, DatePipe],
  templateUrl: './materiallist.component.html',
  styleUrl: './materiallist.component.css'
})
export class MateriallistComponent {

  vendormaterialList: materialData [] = [];
  vendorMaterialListPaginate: materialData [] = [];
  VendorID: number;
  CompanyName: string;
  ContactName: string;
  ContactNo: number;

  date: Date;

  constructor(private router: Router,private materialListService: MateriallistService) {
    this.date = new Date();
    this.getMaterials()
    this.getVendor()
  }

  async getMaterials() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var vendorId = localStorage.getItem("vendorId");

      const response = await this.materialListService.getMaterials(token, LoginAuditID, SecretKey, pageId, vendorId);

      console.log(response.data);

      this.vendormaterialList = response.data.map((item:materialData) =>({
        "VendorMaterialMappingDetailsID": item.VendorMaterialMappingDetailsID,
        "CASNumber": item.CASNumber,
        "MaterialNumber": item.MaterialNumber,
        "MaterialDescription": item.MaterialDescription,
        "MaterialStatus": item.MaterialStatus,
        // "StatusColorCode": "approved",
        "StatusColorCode": item.StatusColorCode,
        "LeadTime": this.date.setDate(this.date.getDate() + item.LeadTime),
      }));

      this.vendorMaterialListPaginate = this.vendormaterialList.slice(0, 10)

      console.log(this.vendormaterialList);
    }

    catch(error){
      console.log(error);
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.vendormaterialList.length){
      endIndex = this.vendormaterialList.length;
    }
    this.vendorMaterialListPaginate = this.vendormaterialList.slice(startIndex, endIndex);
  }


  async getVendor() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var vendorId = localStorage.getItem("vendorId");
      // var VendorId  = localStorage.getItem("VendorId");
      const response = await this.materialListService.getVendor(token, LoginAuditID, SecretKey, pageId, vendorId);

      this.VendorID = response.data.VendorID
      this.CompanyName= response.data.CompanyName
      this.ContactName= response.data.ContactName
      this.ContactNo= response.data.ContactNo

      console.log(this.VendorID)
      console.log(this.ContactName);
      // console.log(vendorid)
    }

    catch(error){
      console.log(error);
    }
  }

  toNegotiationList(VendorMaterialMappingDetailsID: any) {
    console.log(VendorMaterialMappingDetailsID.toString())
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
  }

  toDocumentList(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/vendorDocument');
  }

  openVendorQualification(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/materialDetail');
  }
}
