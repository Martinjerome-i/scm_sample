import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {Router} from "@angular/router";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import {vendorMaterialCommonInterface} from "../../common-interface/common-interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-material-vendor-list',
  standalone: true,
  imports: [MatTabsModule, MatPaginatorModule, MatExpansionModule, MatIconModule, MatMenuModule, MatButtonModule, NgForOf],
  templateUrl: './material-vendor-list.component.html',
  styleUrl: './material-vendor-list.component.css'
})
export class MaterialVendorListComponent implements OnInit {

  MaterialDescription: string = ""
  MaterialNumber: string = ""
  MaterialTypeName: string = ""
  CASNumber: string = ""
  UnitName: string = ""

  vendorMaterialList: vendorMaterialCommonInterface [] = [];

  constructor(private router: Router,private vendorMaterialService: VendorMaterialService) {
    this.getMaterialsData()
    this.getVendorList()
  }

  async getMaterialsData() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var materialId = localStorage.getItem("materialId");
      // var VendorId  = localStorage.getItem("VendorId");
      const response = await this.vendorMaterialService.getMaterialId(token, LoginAuditID, SecretKey, pageId, materialId);

      this.MaterialDescription = response.data.MaterialDescription
      this.MaterialNumber = response.data.MaterialNumber
      this.MaterialTypeName = response.data.MaterialTypeName
      this.CASNumber = response.data.CASNumber
      this.UnitName = response.data.UnitName
    }

    catch(error){
      console.log(error);
    }
  }


  async getVendorList() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var materialId = localStorage.getItem("materialId");

      const response = await this.vendorMaterialService.getMaterialDataId(token, LoginAuditID, SecretKey, pageId, materialId);

      this.vendorMaterialList = response.data.map((item:vendorMaterialCommonInterface) =>({
        "VendorMaterialMappingDetailsID": item.VendorMaterialMappingDetailsID,
        "MappingID": item.MappingID,
        "VendorID": item.VendorID,
        "CompanyName": item.CompanyName,
        "MaterialID": item.MaterialID,
        "CASNumber": item.CASNumber,
        "MaterialNumber": item.MaterialNumber,
        "MaterialDescription": item.MaterialDescription,
        "QuotedPrice": item.QuotedPrice,
        "LeadTime": item.LeadTime,
        "MaterialStatusID": item.MaterialStatusID,
        "MaterialStatus": item.MaterialStatus,
        "StatusColorCode": item.StatusColorCode,
        "PaymentTermsID": item.PaymentTermsID,
        "PaymentTerms": item.PaymentTerms,
        "AdvancePercentage": item.AdvancePercentage,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn,
        "AccountNumber": item.AccountNumber,
        "ContactName": item.ContactName,
        "ContactNo": item.ContactNo,
        "MaterialTypeID": item.MaterialTypeID,
        "MaterialTypeName": item.MaterialTypeName,
        "CurrencyID": item.CurrencyID,
        "CurrencyName": item.CurrencyName,
        "MarketPrice": item.MarketPrice,
        "LastSCMOfferPrice": item.LastSCMOfferPrice,
        "LastVendorRevisedPrice": item.LastVendorRevisedPrice,
        "LastNegotiationQuantity": item.LastNegotiationQuantity,
        "UnitID": item.UnitID,
        "UnitName": item.UnitName
      }));
      console.log(this.vendorMaterialList);
    }

    catch(error){
      console.log(error);
    }
  }

  ngOnInit(): void {
    //
  }

  toNegotiationList(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Materials/vendorNegotiationListing');
  }
}
