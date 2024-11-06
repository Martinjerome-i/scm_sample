import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {mrDocumentListCommonInterface} from "../../common-interface/common-interface";
import {Router} from "@angular/router";
import {MRDocumentService} from "../../common-services/mr/mrdocument.service";
import swal from "sweetalert";

@Component({
  selector: 'app-material-requirements-br',
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
  templateUrl: './material-requirements-br.component.html',
  styleUrl: './material-requirements-br.component.css'
})
export class MaterialRequirementsBrComponent {

  mrDocumentTable: mrDocumentListCommonInterface []= [];
  mrDocumentTablePaginate: mrDocumentListCommonInterface []= [];

  status: string;
  category: string;
  roleCode: any

  constructor(private router: Router, private mrDocumentService: MRDocumentService){
    this.roleCode = localStorage.getItem("roleCode")
    this.getMR()
  }

  async getMR(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var businessRequirementID = localStorage.getItem("businessRequirementID");

      var data = {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      }
      console.log("businessRequirementID: " + businessRequirementID)
      console.log(data)

      const response = await this.mrDocumentService.getMRDocumentList(token,data,businessRequirementID)

      console.log(response.data)

      this.mrDocumentTable = response.data.map((item: mrDocumentListCommonInterface) =>  ({
        "MaterialRequirementID": item.MaterialRequirementID,
        "BusinessRequirementID": item.BusinessRequirementID,
        "MaterialRequirementStatusID": item.MaterialRequirementStatusID,
        "MaterialRequirementStatus": item.MaterialRequirementStatus,
        "StatusColorCode": item.StatusColorCode,
        "MaterialRequirementMaterialID": item.MaterialRequirementMaterialID,
        "MaterialID": item.MaterialID,
        "MaterialDescription": item.MaterialDescription,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn
      }))

      this.mrDocumentTablePaginate = this.mrDocumentTable.slice(0, 10)
    }
    catch(error){
      console.log(error)
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.mrDocumentTable.length){
      endIndex = this.mrDocumentTable.length;
    }
    this.mrDocumentTablePaginate = this.mrDocumentTable.slice(startIndex, endIndex);
  }

  toDocumentList(MaterialRequirementID: number) {
    localStorage.setItem("materialRequirementID", MaterialRequirementID.toString());
    this.router.navigateByUrl('/admin/MaterialRequirements/documents');
  }

  createMaterialRequirement() {
    console.log("working");

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var businessRequirementID = localStorage.getItem("businessRequirementID");

    var addMaterialRequirement = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "MaterialRequirement": {
        "BusinessRequirementID": businessRequirementID,
      },
    }
    console.log(addMaterialRequirement);
    this.mrDocumentService
      .adMRMaterialAdd(addMaterialRequirement, token)
      .then(response => {
        // Login successful
        const user = response.data;
        var materialRequirementID = user['Value'];
        console.log(user);
        localStorage.setItem("materialRequirementID", materialRequirementID);
        // Navigate
        this.router.navigateByUrl('/admin/MaterialRequirements/add');
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", 'Account Number already exists' , "error");
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }
}
