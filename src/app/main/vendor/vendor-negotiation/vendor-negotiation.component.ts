import { Component,OnInit } from '@angular/core';
import {CommonModule, formatDate, NgClass} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormBuilder, FormsModule, ReactiveFormsModule,Validators,FormGroup } from '@angular/forms';
import swal from "sweetalert";
import { MaterialaddService } from '../materialadd/service/materialadd.service';
import { VendoraddService } from '../../common-services/vendor-add/vendoradd.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {NegotiationService} from "../../common-services/negotiation/negotiation.service";
import {subscribe} from "node:diagnostics_channel";


interface negotiationStatusData {
  NegotiationStatusID: number,
  NegotiationStatus: string,
  StatusColorCode: string,
}

@Component({
  selector: 'app-vendor-negotiation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    MatGridListModule,
    MatDialogModule
  ],
  templateUrl: './vendor-negotiation.component.html',
  styleUrl: './vendor-negotiation.component.css'
})
export class VendorNegotiationComponent implements OnInit{

  myform!: FormGroup;
  submitted = false;

  negotiationStatusLastData: any;

  negotiationStatusList: negotiationStatusData[] = [];
  negotiationStatusSelect: any;

  date: Date;

  userType: any = ""
  vendorMaterialMappingDetailsNegotiationID: any = ""

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialaddService: MaterialaddService,
    private negotiationService: NegotiationService,
  ){
    this.userType = localStorage.getItem("roleCode");
    this.getNegotiationStatusDropDownData();
    this.getNegotiationDefaultData();
  }

  getNegotiationStatusDropDownData() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.materialaddService.getNegotiationStatus(token, LoginAuditID, SecretKey, pageId).then(response => {
      this.negotiationStatusList = response.data.map((item:negotiationStatusData) =>({
        'NegotiationStatusID': item.NegotiationStatusID,
        'NegotiationStatus': item.NegotiationStatus,
        'StatusColorCode': item.StatusColorCode,
      }));
      console.log(this.negotiationStatusList);
    })
      .catch((error: any) => {
        // Handle login errors
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }

  async getNegotiationDefaultData() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");

    try {
      const response = await this.negotiationService.getNegotiationLastData(token, LoginAuditID, SecretKey, pageId, detailsID);

      console.log(response.data)

      this.vendorMaterialMappingDetailsNegotiationID = response.data['VendorMaterialMappingDetailsNegotiationID']

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
      this.f['lastPurchasedPrice'].setValue(this.negotiationStatusLastData.LastPurchasedPrice);
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

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var vendorMaterialMappingDetailsID = this.vendorMaterialMappingDetailsNegotiationID;

    if (this.userType.toLowerCase() == 'vendor') {
      this.submitVendor(token, LoginAuditID, SecretKey, vendorMaterialMappingDetailsID)
    } else {
      this.submitSCM(token, LoginAuditID, SecretKey, vendorMaterialMappingDetailsID)
    }
  }

  submitSCM(token: any, LoginAuditID: any, SecretKey: any, vendorMaterialMappingDetailsID: any) {
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
    this.negotiationService
      .saveNegotiation(addVendor, token)
      .then(response => {
        // Login successful
        swal("Added!", "Negotiation Added Successfully!", "success").then(
          value => {
            // Navigate
            this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
          }
        );
      })
      .catch((error: any) => {
        // Handle login errors
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService

      })
      .finally(() => {
        // Always set loading to false

      });
  }

  submitVendor(token: any, LoginAuditID: any, SecretKey: any, vendorMaterialMappingDetailsID: any) {
    alert("working")
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": 3
      },
      "VendorNegotiationUpdate": {
        "VendorMaterialMappingDetailsNegotiationID": vendorMaterialMappingDetailsID,
        "VendorRevisedPrice": this.f['revisedPrice'].value,
      },
    }

    console.log(addVendor);
    this.negotiationService
      .saveNegotiation(addVendor, token)
      .then(response => {
        // Login successful
        swal("Added!", "Negotiation Added Successfully!", "success").then(
          value => {
            // Navigate
            this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
          }
        );
      })
      .catch((error: any) => {
        // Handle login errors
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService

      })
      .finally(() => {
        // Always set loading to false

      });
  }
}
