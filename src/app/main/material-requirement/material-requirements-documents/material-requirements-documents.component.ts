import { Component } from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {mrUploadedDocumentListCommonInterface} from "../../common-interface/common-interface";
import {Router} from "@angular/router";
import {MRDocumentService} from "../../common-services/mr/mrdocument.service";

@Component({
  selector: 'app-material-requirements-documents',
  standalone: true,
    imports: [
        MatPaginator,
        NgForOf,
        NgIf
    ],
  templateUrl: './material-requirements-documents.component.html',
  styleUrl: './material-requirements-documents.component.css'
})
export class MaterialRequirementsDocumentsComponent {

  // vendorDocumentList: documentData [] =[];
  mrUploadedDocumentTable: mrUploadedDocumentListCommonInterface [] = [];
  mrUploadedDocumentTablePaginate: mrUploadedDocumentListCommonInterface [] = [];
  roleCode: any;

  constructor(private router: Router, private mrDocumentService: MRDocumentService){
    this.getMrUploaded()
    this.roleCode = localStorage.getItem('roleCode')
  }

  async getMrUploaded(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var mrId = localStorage.getItem("materialRequirementID");

      console.log(mrId)

      const response = await this.mrDocumentService.getMRUploadedDocumentList(token,LoginAuditID,SecretKey,pageId,mrId)
      this.mrUploadedDocumentTable = response.data.map((item:mrUploadedDocumentListCommonInterface) =>({
        "MaterialRequirementDocumentID": item.MaterialRequirementDocumentID,
        "MaterialRequirementID": item.MaterialRequirementID,
        "OriginalFileName": item.OriginalFileName,
        "UploadedFilePath": item.UploadedFilePath,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn
      }));
      this.mrUploadedDocumentTablePaginate = this.mrUploadedDocumentTable.slice(0, 10)
    }
    catch(error){
      console.log(error)
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.mrUploadedDocumentTable.length){
      endIndex = this.mrUploadedDocumentTable.length;
    }
    this.mrUploadedDocumentTablePaginate = this.mrUploadedDocumentTable.slice(startIndex, endIndex);
  }
}
