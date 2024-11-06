import {Component, OnInit} from '@angular/core';
import {CommonModule, formatDate, NgClass} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormBuilder, FormsModule, ReactiveFormsModule,Validators,FormGroup } from '@angular/forms';
import swal from "sweetalert";
import { PurchaseRequestNegotiationService } from '../purchase-request-negotiation/service/purchase-request-negotiation.service';
// import { VendoraddService } from '../../common-services/vendor-add/vendoradd.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {NegotiationService} from "../../common-services/negotiation/negotiation.service";

interface negotiationStatusData {
  NegotiationStatusID: number,
  NegotiationStatus: string,
  StatusColorCode: string,
}

interface negotiationStatusLastData {
  VendorMaterialMappingDetailsID: number,
  MappingID: number,
  VendorID: number,
  CompanyName: string,
  MaterialID: number,
  CASNumber: string,
  MaterialNumber: string,
  MaterialDescription: string,
  QuotedPrice: number,
  LeadTime: number,
  MaterialStatusID: number,
  MaterialStatus: string,
  StatusColorCode: string,
  PaymentTermsID: number,
  PaymentTerms: string,
  AdvancePercentage: number,
  LastUpdatedBy: string,
  LastUpdatedOn: string,
  AccountNumber: string,
  ContactName: string,
  ContactNo: string,
  MaterialTypeID: number,
  MaterialTypeName: string,
  CurrencyID: number,
  CurrencyName: string,
  MarketPrice: number,
  LastSCMOfferPrice: number,
  LastVendorRevisedPrice: number,
  LastNegotiationQuantity: number,
  UnitID: number,
  UnitName: number,
}


@Component({
  selector: 'app-purchase-request-negotiation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    MatGridListModule,
    MatDialogModule],
  templateUrl: './purchase-request-negotiation.component.html',
  styleUrl: './purchase-request-negotiation.component.css'
})


export class PurchaseRequestNegotiationComponent implements OnInit{

  myform!: FormGroup;
  submitted = false;

  negotiationStatusLastData: any;

  negotiationStatusList: negotiationStatusData[] = [];
  negotiationStatusSelect: any;

  date: Date;

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private materialaddService: MaterialaddService,
    private purchaseRequestNegotiationService: PurchaseRequestNegotiationService,
  ){
    this.getNegotiationStatusDropDownData();
    this.getNegotiationDefaultData();
  }

  async getNegotiationStatusDropDownData() {
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
  
      const response=await this.purchaseRequestNegotiationService.getNegotiationStatus(token, LoginAuditID, SecretKey, pageId);

        this.negotiationStatusList = response.data.map((item:negotiationStatusData) =>({
          'NegotiationStatusID': item.NegotiationStatusID,
          'NegotiationStatus': item.NegotiationStatus,
          'StatusColorCode': item.StatusColorCode,
        }));
        console.log(this.negotiationStatusList);      
    }
    catch(error){
      console.log(error);
    }
  }

  async getNegotiationDefaultData() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");

    try {
      const response = await this.purchaseRequestNegotiationService.getNegotiationLastData(token, LoginAuditID, SecretKey, pageId, detailsID);

      console.log(response.data)
      this.negotiationStatusLastData = {
        'VendorMaterialMappingDetailsID': response.data['VendorMaterialMappingDetailsID'],
        'MappingID': response.data['MappingID'],
        'VendorID': response.data['VendorID'],
        'CompanyName': response.data['CompanyName'],
        'MaterialID': response.data['MaterialID'],
        'CASNumber': response.data['CASNumber'],
        'MaterialNumber': response.data['MaterialNumber'],
        'MaterialDescription': response.data['MaterialDescription'],
        'QuotedPrice': response.data['QuotedPrice'],
        'LeadTime': response.data['LeadTime'],
        'MaterialStatusID': response.data['MaterialStatusID'],
        'MaterialStatus': response.data['MaterialStatus'],
        'StatusColorCode': response.data['StatusColorCode'],
        'PaymentTermsID': response.data['PaymentTermsID'],
        'PaymentTerms': response.data['PaymentTerms'],
        'AdvancePercentage': response.data['AdvancePercentage'],
        'LastUpdatedBy': response.data['LastUpdatedBy'],
        'LastUpdatedOn': response.data['LastUpdatedOn'],
        'AccountNumber': response.data['AccountNumber'],
        'ContactName': response.data['ContactName'],
        'ContactNo': response.data['ContactNo'],
        'MaterialTypeID': response.data['MaterialTypeID'],
        'MaterialTypeName': response.data['MaterialTypeName'],
        'CurrencyID': response.data['CurrencyID'],
        'CurrencyName': response.data['CurrencyName'],
        'MarketPrice': response.data['MarketPrice'],
        'LastSCMOfferPrice': response.data['LastSCMOfferPrice'],
        'LastVendorRevisedPrice': response.data['LastVendorRevisedPrice'],
        'LastNegotiationQuantity': response.data['LastNegotiationQuantity'],
        'UnitID': response.data['UnitID'],
        'UnitName': response.data['UnitName'],
      };

      var currentLeadTime = this.date.setDate(this.date.getDate() + this.negotiationStatusLastData.LeadTime);

      this.f['purchaseRequestNumber'].setValue(this.negotiationStatusLastData.purchaseRequestNumber);
      this.f['vendorName'].setValue(this.negotiationStatusLastData.CompanyName);
      this.f['casNumber'].setValue(this.negotiationStatusLastData.CASNumber);
      this.f['materialName'].setValue(this.negotiationStatusLastData.MaterialDescription);
      this.f['materialType'].setValue(this.negotiationStatusLastData.MaterialTypeName);
      this.f['qtyAdd'].setValue(this.negotiationStatusLastData.LastNegotiationQuantity);
      this.f['unitMeasure'].setValue(this.negotiationStatusLastData.UnitName);
      this.f['currency'].setValue(this.negotiationStatusLastData.CurrencyName);
      this.f['marketPrice'].setValue(this.negotiationStatusLastData.MarketPrice);
      this.f['quotedPrice'].setValue(this.negotiationStatusLastData.QuotedPrice);
      this.f['revisedPrice'].setValue(this.negotiationStatusLastData.LastVendorRevisedPrice);
      this.f['lastPurchasedPrice'].setValue(this.negotiationStatusLastData.lastPurchasedPrice);
      this.f['offerPrice'].setValue(this.negotiationStatusLastData.LastSCMOfferPrice);
      this.f['leadTime'].setValue(formatDate(currentLeadTime, 'dd/MM/yyyy', 'en-US'));
      console.log("negotiationStatusLastData: " + this.negotiationStatusLastData.purchaseRequestNumber);
    } catch (error) {
      console.log(error);
    }
  }

  //check for valid feilds
  ngOnInit(){
    this.date = new Date();
    this.myform= this.formBuilder.group({
      purchaseRequestNumber: ['',Validators.required],
      vendorName: ['',Validators.required],
      casNumber: ['', Validators.required],
      materialName: ['', Validators.required],
      materialType: ['', Validators.required],
      qtyAdd: ['', Validators.required],
      unitMeasure: ['', Validators.required],
      currency: ['', Validators.required],
      marketPrice: ['', Validators.required],
      quotedPrice: ['', Validators.required],
      revisedPrice: ['', Validators.required],
      lastPurchasedPrice: ['', Validators.required],
      offerPrice: ['', Validators.required],
      leadTime: ['', Validators.required],
      negotiationStatus: ['', Validators.required],
    })
  }

  get f() { return this.myform.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    // if (this.myform.invalid) {
    //   return;
    // }

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var vendorMaterialMappingDetailsID = localStorage.getItem("vendorMaterialMappingDetailsID");


    var data = {
      "VendorMaterialMappingDetailsID": vendorMaterialMappingDetailsID,
      "PurchaseRequestNo": this.f['purchaseRequestNumber'].value,
      "Quantity": this.f['qtyAdd'].value,
      "MarketPrice": this.f['marketPrice'].value,
      "QuotedPrice": this.f['quotedPrice'].value,
      "SCMOfferPrice": this.f['offerPrice'].value,
      "LeadTime": this.f['leadTime'].value
    };
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": 3
      },
      "VendorMaterialMappingDetailsNegotiation": data,
    }

    console.log(addVendor);
    try{
      const negotiation= this.purchaseRequestNegotiationService.saveNegotiation(addVendor, token);

        // Login successful
        swal("Added!", "Negotiation Added Successfully!", "success")
            // Navigate
            this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
        
      }
      catch (error) {
        console.log(error);
      }
  }
}