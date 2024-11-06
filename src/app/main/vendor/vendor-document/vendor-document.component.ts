import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { VendorDocumentService } from './service/vendor-document.service';


interface documentData{

  OriginalFileName: string;
  description: string;
  LastUpdatedOn: string;
}

@Component({
  selector: 'app-vendor-document',
  standalone: true,
  imports: [MatPaginatorModule,MatMenuModule,MatIconModule,NgForOf],
  templateUrl: './vendor-document.component.html',
  styleUrl: './vendor-document.component.css'
})
export class VendorDocumentComponent {

  // vendorDocumentList: documentData [] =[];
  vendorDocumentTable: documentData []= [];
  vendorDocumentTablePaginate: documentData []= [];
  vendorID: number;
  companyName: string;
  contactName: string;
  contactNo: number;
  status: string;
  materialName: string;
  category: string;
  qualificationStatus: string;
  expectedclosingDate: Date;
  casNumber: number;
  itemNumber: number;

  constructor(private router: Router, private documentService: VendorDocumentService){
    this.getVendors()
    this.getDocumentdata()
    this.getMaterials()
  }

  async getVendors(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var vendorId = localStorage.getItem("vendorId");

      const response = await this.documentService.getVendorList(token,LoginAuditID,SecretKey,pageId,vendorId)
      this.companyName= response.data.CompanyName;
      this.vendorID= response.data.VendorID;
      this.contactName= response.data.ContactName;
      this.contactNo= response.data.ContactNo;
      this.status= response.data.VendorStatus;
    }
    catch(error){
      console.log(error)
    }
  }


  async getDocumentdata(){

    try{

      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");

      const response = await this.documentService.getDocumentList(token,LoginAuditID,SecretKey,pageId,detailsID)
      console.log(response.data)

      this.vendorDocumentTable = response.data.map((item:documentData) =>({
        "OriginalFileName": item.OriginalFileName,
        "Desc": item.description,
        "LastUpdatedOn": item.LastUpdatedOn
      }));

      this.vendorDocumentTablePaginate = this.vendorDocumentTable.slice(0, 10)
      console.log(this.vendorDocumentTable)

    }
    catch(error){
      console.log(error)
    }

  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.vendorDocumentTable.length){
      endIndex = this.vendorDocumentTable.length;
    }
    this.vendorDocumentTablePaginate = this.vendorDocumentTable.slice(startIndex, endIndex);
  }

  async getMaterials(){
      try{

        var token = localStorage.getItem("token");
        var LoginAuditID = localStorage.getItem("LoginAuditID");
        var SecretKey = localStorage.getItem("SecretKey");
        var pageId = localStorage.getItem("PageID");
        var materialId = localStorage.getItem("materialId");

        const response = await this.documentService.getMaterials(token, LoginAuditID, SecretKey, pageId, materialId);

      console.log(response.data);
      this.casNumber= response.data.CASNumber;
      this.materialName= response.data.MaterialDescription;
      this.itemNumber = response.data.MaterialNumber;
      this.expectedclosingDate= response.data.LastUpdatedOn;

      }
      catch(error){
        console.log(error)
      }
  }
}
