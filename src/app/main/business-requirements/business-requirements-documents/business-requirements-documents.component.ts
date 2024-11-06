import { Component } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgForOf,NgIf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {BRDocumentService} from "../../common-services/bd/brdocument-service.service";
import {Router} from "@angular/router";
import {bdUploadedDocumentListCommonInterface} from "../../common-interface/common-interface";

@Component({
  selector: 'app-business-requirements-documents',
  standalone: true,
  imports: [MatPaginatorModule,MatMenuModule,MatIconModule,NgForOf,NgIf],
  templateUrl: './business-requirements-documents.component.html',
  styleUrl: './business-requirements-documents.component.css'
})
export class BusinessRequirementsDocumentsComponent {

  // vendorDocumentList: documentData [] =[];
  brUploadedDocumentTable: bdUploadedDocumentListCommonInterface []= [];
  brUploadedDocumentTablePaginate: bdUploadedDocumentListCommonInterface []= [];
  roleCode: any;

  constructor(private router: Router, private brDocumentService: BRDocumentService){
    this.getBrUploaded()
    this.roleCode = localStorage.getItem('roleCode')
  }

  async getBrUploaded(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var brId = localStorage.getItem("businessRequirementID");

      console.log(brId)

      const response = await this.brDocumentService.getBRUploadedDocumentList(token,LoginAuditID,SecretKey,pageId,brId)
      this.brUploadedDocumentTable = response.data.map((item:bdUploadedDocumentListCommonInterface) =>({
        "BusinessRequirementDocumentID": item.BusinessRequirementDocumentID,
        "BusinessRequirementID": item.BusinessRequirementID,
        "OriginalFileName": item.OriginalFileName,
        "UploadedFilePath": item.UploadedFilePath,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn
      }));
      this.brUploadedDocumentTablePaginate = this.brUploadedDocumentTable.slice(0, 10)
    }
    catch(error){
      console.log(error)
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.brUploadedDocumentTable.length){
      endIndex = this.brUploadedDocumentTable.length;
    }
    this.brUploadedDocumentTablePaginate = this.brUploadedDocumentTable.slice(startIndex, endIndex);
  }
}
