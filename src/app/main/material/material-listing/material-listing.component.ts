import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgFor, NgIf} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MaterialListingService } from './service/material-listing.service';
import {materialCommonInterface, vendorMaterialCommonInterface} from "../../common-interface/common-interface";
import {MaterialVendorListService} from "../material-vendor-list/service/material-vendor-list.service";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import {MaterialMarketPriceComponent} from "../material-market-price/material-market-price.component";
import {
  MaterialRequirementsListingComponent
} from "../../material-requirement/material-requirements-listing/material-requirements-listing.component";


@Component({
  selector: 'app-material-listing',
  standalone: true,
  imports: [NgFor, MatTabsModule, MatPaginatorModule, MatExpansionModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule, NgIf, MaterialRequirementsListingComponent],
  templateUrl: './material-listing.component.html',
  styleUrls: ['./material-listing.component.css']
})

export class MaterialListingComponent{
  materialList:materialCommonInterface []= [];
  materialListPaginate:materialCommonInterface []= [];

  vendorMaterialList: vendorMaterialCommonInterface [] = [];
  vendorMaterialListPaginate: vendorMaterialCommonInterface [] = [];

  userType: any
  constructor(
    private router: Router,
    private vendorMaterialService: VendorMaterialService,
    public dialog:MatDialog,
    ) {
    this.userType = localStorage.getItem("roleCode");
    console.log(this.userType.toString().toLowerCase())
    this.getMaterial();
  }

  async getMaterial(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      if (this.userType.toLowerCase() != 'vendor') {
        const response = await this.vendorMaterialService.getMaterialList(token,LoginAuditID,SecretKey,pageId);

        this.materialList = response.data.map((item:materialCommonInterface) =>({
          "MaterialID" : item.MaterialID,
          "CASNumber" : item.CASNumber,
          "MaterialTypeID" : item.MaterialTypeID,
          "MaterialTypeName" : item.MaterialTypeName,
          "UnitID" : item.UnitID,
          "UnitName" : item.UnitName,
          "Plant" : item.Plant,
          "MaterialNumber" : item.MaterialNumber,
          "MaterialDescription" : item.MaterialDescription ,
        }));

        this.materialListPaginate = this.materialList.slice(0, 10)
      } else {

        var userID = localStorage.getItem("userID");
        // var userID = "12";

        const response = await this.vendorMaterialService.getVendorDataId(token, LoginAuditID, SecretKey, pageId, userID);
        console.log(response.data)

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
        this.vendorMaterialListPaginate = this.vendorMaterialList.slice(0, 10)
      }
    }
    catch(error){
      console.log(error);
    }
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.materialList.length){
      endIndex = this.materialList.length;
    }
    this.materialListPaginate = this.materialList.slice(startIndex, endIndex);
  }

  toVendorList(MaterialID: any) {
    localStorage.setItem("materialId", MaterialID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Materials/vendor');
  }

  toNegotiationList(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
  }

  toDocumentList(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/vendorDocument');
  }
  openDialog() {
    const dialogRef = this.dialog.open(MaterialMarketPriceComponent, {
      height: '300px',
      width: '596px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
