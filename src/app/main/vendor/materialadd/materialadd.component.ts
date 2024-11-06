import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatGridListModule} from '@angular/material/grid-list';
import swal from "sweetalert";
import {MaterialaddService} from "./service/materialadd.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommonModule, NgClass} from "@angular/common";
import {response} from "express";
import { addmaterialvendorData } from '../../common-interface/common-interface';


// interface vendorData {
//   CompanyName: string;
//   ContactNo: number;
//   PostalCode: number;
// }


@Component({
  selector: 'app-materialadd',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    NgClass,
    MatGridListModule,
    MatDialogModule
  ],
  templateUrl: './materialadd.component.html',
  styleUrl: './materialadd.component.css'
})
export class MaterialaddComponent implements OnInit{
  vendormaterialList: addmaterialvendorData [] = [];
  CompanyName : number;
  ContactName: string;
  FirstName: string;
  ContactNo: number;
  postalcode: number;
  VendorStreet: string;
  Email: string;

  form!: FormGroup;
  formnew!: FormGroup;
  loading = false;
  submitted = false;

  // Initializing LocalStorage
  // localStorage = require('localStorage');

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialaddService: MaterialaddService,

    public dialog:MatDialog,
    // private alertService: AlertService
  ){
    this.getVendor()
    // console.log("Login service: " + localStorage.getItem('token'));
    // this.getMaterialDropDownData();
  }

  async getVendor(){
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      var vendorId = localStorage.getItem("vendorId");

      const response = await this.materialaddService.getVendor(token, LoginAuditID, SecretKey, pageId, vendorId);

      // this.vendormaterialList = response.data.CompanyName
      this.CompanyName = response.data.CompanyName
      this.ContactName= response.data.ContactName
      this.ContactNo= response.data.ContactNo
      this.postalcode= response.data.PostalCode
      this.VendorStreet= response.data.VendorStreet
      this.Email = response.data.Email
      console.log(this.FirstName);
    }

    catch(error){
      console.log(error);
    }


  }
  ngOnInit() {
    this.form = this.formBuilder.group({
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

    this.formnew =this.formBuilder.group({
      CompanyName: ['', Validators.required],
      ContactName: ['', Validators.required],
      Email: ['', Validators.required],
      ContactNo: ['', Validators.required],
      VendorStreet:  ['', Validators.required]
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

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

    var data2= {
      "CompanyName": this.f['CompanyName'].value,
      "ContactName": this.f['FirstName'].value,
      "ContactNo": this.f['ContactNo'].value,
      "VendorStreet": this.f['VendorStreet'].value
    }
    // this.materialaddService
    //   .saveVendor(addVendor, LoginAuditID, SecretKey, token)
    //   .then(response => {
    //     // Login successful
    //     const user = response.data;
    //     var vendorId = user['Value'];
    //     console.log(user);
    //     localStorage.setItem("vendorId", vendorId);
    //     swal("Added!", "Vendor Added Successfully!", "success");
    //     // Navigate
    //     this.router.navigateByUrl('/admin/Vendor/add');
    //   })
    //   .catch((error: any) => {
    //     // Handle login errors
    //     // this.alertService.error(error);
    //     console.log(error); // Remove this line after implementing alertService
    //     this.loading = false;
    //   })
    //   .finally(() => {
    //     // Always set loading to false
    //     this.loading = false;
    //   });
  }

  openDialog() {
    const dialogRef = this.dialog.open(MaterialAddDialog, {
      height: '650px',
      width: '1200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'materialadd-dialog',
  templateUrl: 'materialadd-dialog.html',
  styleUrl: './materialadd-dialog.css',
  standalone: true
})
export class MaterialAddDialog {

  constructor(private materialaddService: MaterialaddService){
    console.log("Login service: " + localStorage.getItem('token'));
    this.getMaterialDropDownData();
  }

  getMaterialDropDownData() {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");

    var requestBody = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
    }
    this.materialaddService.getMaterialType(requestBody, token).then(response => {
      console.log(response.data);
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
