import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,FormControl} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import swal from "sweetalert";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MaterialAddService } from './service/material-add.service';
import { MaterialDialogComponent } from '../../material-dialog/material-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {
  paymentTermsCommonInterface,
  vendorCommonInterface,
  vendorMaterialCommonInterface
} from "../../common-interface/common-interface";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import { VendoraddService } from '../../common-services/vendor-add/vendoradd.service';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-vendoradd',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    MatGridListModule,
    MatDialogModule, MatRadioModule, MatButton
  ],
  templateUrl: './material-add.component.html',
  styleUrl: './material-add.component.css'
})
export class MaterialAddComponent implements OnInit {

  vendorList: vendorCommonInterface [] = [];
  vendorSelect: any;

  vendorMaterialList: vendorMaterialCommonInterface [] = [];

  paymentTermList: paymentTermsCommonInterface [] = [];
  paymentTermSelect: any;

  form!: FormGroup;
  formOne!: FormGroup;
  loading = false;
  submitted = false;
  radioButtons = [
    {Id: 1, name: 'New'},
    {Id: 2, name: 'Existing'},
  ]

  // Initializing LocalStorage
  // localStorage = require('localStorage');

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialaddService: MaterialAddService,
    private vendorMaterialService: VendorMaterialService,
    private vendoraddService: VendoraddService,
    public dialog:MatDialog,
    // private alertService: AlertService
  ){
    // console.log("Login service: " + this.localStorage.getItem('token'));
    this.getVendorList()
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      radio: new FormControl('',Validators.required),
      accountGroup: ['', Validators.required],
      accountNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      vendorStreet: ['', Validators.required],
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      street3: ['', Validators.required],
      street4: ['', Validators.required],
      street5: ['', Validators.required],
      houseNumber: ['', Validators.required],
      city: ['', Validators.required],
      PostalCode: ['', Validators.required],
      State: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      alternateEmail: ['', Validators.required],
      contactNo: ['', Validators.required],
      alternateContactNo: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.formOne = this.formBuilder.group({
      advancePercentage: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get g() { return this.formOne.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");

    this.loading = true;
    var data = {
      "AccountGroup": this.f['accountGroup'].value,
      "AccountNumber": this.f['accountNumber'].value,
      "FirstName": this.f['firstName'].value,
      "LastName": this.f['lastName'].value,
      "VendorStreet": this.f['vendorStreet'].value,
      "Street1": this.f['street1'].value,
      "Street2": this.f['street2'].value,
      "Street3": this.f['street3'].value,
      "Street4": this.f['street4'].value,
      "Street5": this.f['street5'].value,
      "HouseNumber": this.f['houseNumber'].value,
      "City": this.f['city'].value ,
      "PostalCode": this.f['PostalCode'].value,
      "State": this.f['State'].value,
      "CompanyName": this.f['companyName'].value,
      "Email": this.f['email'].value,
      "AlternativeEmail": this.f['alternateEmail'].value,
      "ContactNo": this.f['contactNo'].value,
      "AlternativeContactNo": this.f['alternateContactNo'].value,
      "Country": this.f['country'].value,
      "ContactName": this.f['firstName'].value,
      "VendorStatusID": 1,
      "VendorStatus": "string",
      "StatusColorCode": "string"
    };
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": 3
      },
      "Vendor": data,
    }
    console.log(addVendor);
    this.vendoraddService
      .saveVendor(addVendor, token)
      .then(response => {
        // Login successful
        const user = response.data;
        var vendorId = user['Value'];
        console.log(user);
        localStorage.setItem("vendorId", vendorId);
        swal("Added!", "Vendor Added Successfully!", "success");
      })
      .catch((error: any) => {
        // Handle login errors
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
        this.loading = false;
      })
      .finally(() => {
        // Always set loading to false
        this.loading = false;
      });
  }


  openDialog() {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      height: '650px',
      width: '1200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  async getVendorList() {
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.vendorMaterialService.getVendorList(token,LoginAuditID,SecretKey,pageId);

      this.vendorList = response.data.map((item:vendorCommonInterface) =>({
        "VendorID": item.VendorID,
        "CompanyName": item.CompanyName,
        "ContactName": item.ContactName,
        "ContactNo": item.ContactNo,
        "VendorStatusID": item.VendorStatusID,
        "VendorStatus": item.VendorStatus,
        "StatusColorCode": item.StatusColorCode,
      }));
      console.log(this.vendorList);

    }
    catch(error){
      console.log(error);
    }
  }


  async getVendorMaterialList(vendorSelect: any) {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");

      const response = await this.vendorMaterialService.getVendorDataId(token, LoginAuditID, SecretKey, pageId, vendorSelect);
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
      console.log(this.vendorMaterialList);
    }

    catch(error){
      console.log(error);
    }
  }

  async vendorSelected() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      // var VendorId  = localStorage.getItem("VendorId");
      const response = await this.vendorMaterialService.getVendorId(token, LoginAuditID, SecretKey, pageId, this.vendorSelect);

      console.log(response.data)

      this.f['accountGroup'].setValue(response.data['AccountGroup']),
      this.f['accountNumber'].setValue(response.data['AccountNumber']),
      this.f['firstName'].setValue(response.data['FirstName']),
      this.f['lastName'].setValue(response.data['LastName']),
      this.f['vendorStreet'].setValue(response.data['VendorStreet']),
      this.f['street1'].setValue(response.data['Street1']),
      this.f['street2'].setValue(response.data['Street2']),
      this.f['street3'].setValue(response.data['Street3']),
      this.f['street4'].setValue(response.data['Street4']),
      this.f['street5'].setValue(response.data['Street5']),
      this.f['houseNumber'].setValue(response.data['HouseNumber']),
      this.f['city'].setValue(response.data['City']) ,
      this.f['PostalCode'].setValue(response.data['PostalCode']),
      this.f['State'].setValue(response.data['State']),
      this.f['companyName'].setValue(response.data['CompanyName']),
      this.f['email'].setValue(response.data['Email']),
      this.f['alternateEmail'].setValue(response.data['AlternativeEmail']),
      this.f['contactNo'].setValue(response.data['ContactNo']),
      this.f['alternateContactNo'].setValue(response.data['AlternativeContactNo']),
      this.f['country'].setValue(response.data['Country'])

      await this.getVendorMaterialList(this.vendorSelect);
      await this.loadPaymentTerm();
    }

    catch(error){
      console.log(error);
    }
  }

  async onPaymentTerms(VendorMaterialMappingDetailsID: number) {
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      var paymentTermsData = {
        "VendorMaterialMappingDetailsID": VendorMaterialMappingDetailsID,
        "PaymentTermsID": this.paymentTermSelect,
        "AdvancePercentage": this.g['advancePercentage'].value,
      }
      var addPaymentTerms = {
        "DataRequest": {
          "LoginAuditID": LoginAuditID,
          "SecretKey": SecretKey,
          "PageID": pageId
        },
        "VMPaymentTermsDetails": [paymentTermsData],
      }

      console.log(addPaymentTerms)

      this.vendorMaterialService
        .addMaterialPaymentTerms(addPaymentTerms, token)
        .then(response => {
          // Login successful
          swal("Added!", "Payment Terms Changed Successfully!", "success");
        })
        .catch((error: any) => {
          // Handle login errors
          // this.alertService.error(error);
          console.log(error); // Remove this line after implementing alertService
          this.loading = false;
        })
        .finally(() => {
          // Always set loading to false
          this.loading = false;
        });

      console.log(this.paymentTermList);
    }
    catch(error){
      console.log(error);
    }
  }

  async loadPaymentTerm() {
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.vendorMaterialService.getMaterialPaymentTerms(token,LoginAuditID,SecretKey,pageId);

      this.paymentTermList = response.data.map((item:paymentTermsCommonInterface) =>({
        "MaterialPaymentTermsID": item.MaterialPaymentTermsID,
        "MaterialPaymentTerms": item.MaterialPaymentTerms,
        "Description": item.Description,
        "IsActive": item.IsActive,
      }));

      console.log(this.paymentTermList);
    }
    catch(error){
      console.log(error);
    }
  }
}

