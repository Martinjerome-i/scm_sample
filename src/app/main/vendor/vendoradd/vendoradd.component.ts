import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, FormControl,ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import { VendoraddService } from '../../common-services/vendor-add/vendoradd.service'
import swal from "sweetalert";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MaterialDialogComponent } from '../../material-dialog/material-dialog.component';


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
    MatDialogModule,
  ],
  templateUrl: './vendoradd.component.html',
  styleUrl: './vendoradd.component.css'
})
export class VendoraddComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;


  // Initializing LocalStorage
  // localStorage = require('localStorage');

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendoraddService: VendoraddService,

    public dialog:MatDialog,
    // private alertService: AlertService
  ) {
    // console.log("Login service: " + this.localStorage.getItem('token'));
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      accountGroup: ['', Validators.required],
      accountNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      contactNo: ['', Validators.required],
      alternateContactNo: ['', Validators.required],
      email: ['', Validators.required],
      alternateEmail: ['', Validators.required],
      houseNumber: ['', Validators.required],
      vendorStreet: ['', Validators.required],
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      street3: ['', Validators.required],
      street4: ['', Validators.required],
      street5: ['', Validators.required], 
      city: ['', Validators.required],
      State: ['', Validators.required],
      country: ['', Validators.required],
      PostalCode: ['', Validators.required],   
    });
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
    var pageId = localStorage.getItem("PageID");

    this.loading = true;
    var data = {
      "VendorStatusID": 1,
      // "VendorStatus": "string",
      // "StatusColorCode": "string",
      "AccountGroup": this.f['accountGroup'].value,
      "AccountNumber": this.f['accountNo'].value,
      "FirstName": this.f['firstName'].value,
      "LastName": this.f['lastName'].value,
      "CompanyName": this.f['companyName'].value,
      "ContactNo": this.f['contactNo'].value,
      "AlternateContactNo": this.f['alternateContactNo'].value,
      "Email": this.f['email'].value,
      "AlternativeEmail": this.f['alternateEmail'].value,
      "HouseNumber": this.f['houseNumber'].value,
      "VendorStreet": this.f['vendorStreet'].value,
      "Street1": this.f['street1'].value,
      "Street2": this.f['street2'].value,
      "Street3": this.f['street3'].value,
      "Street4": this.f['street4'].value,
      "Street5": this.f['street5'].value,
      "City": this.f['city'].value ,
      "State": this.f['State'].value,
      "Country": this.f['country'].value,
      "PostalCode": this.f['PostalCode'].value,    
    };
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
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
        // Navigate
        this.router.navigateByUrl('/admin/Vendor/add');
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", `Account Number already exists` , "error");
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
}
