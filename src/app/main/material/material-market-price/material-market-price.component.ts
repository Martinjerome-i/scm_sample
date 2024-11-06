import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialDialogService} from "../../material-dialog/service/material-dialog.service";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import swal from "sweetalert";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-material-market-price',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './material-market-price.component.html',
  styleUrl: './material-market-price.component.css'
})
export class MaterialMarketPriceComponent implements OnInit {

  myForm!: FormGroup;
  loading = false;
  submitted = false;
  files: File

  constructor(
    private formBuilder:FormBuilder,
    public dialog:MatDialog,
    private router: Router,
    private vendorMaterialService: VendorMaterialService
  ){
    // this.getMaterial()
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      uploadDocument: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  uploadMultiFile = async (event: any)  => {
    this.files = event.target.files[0]
  }

  async onSubmit() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.loading = true;

    try {
      // Navigate
      this.closeDialog();

    if (this.files) {
      let formParams = new FormData();

      formParams.append('UploadFile', this.files);

      console.log("UploadFile")
      console.log(formParams.get("UploadFile"))

      // Assuming uploadRequest is defined somewhere
      const uploadResponse = await this.vendorMaterialService.uploadMarketPrice(
        formParams,
        loginAuditID,
        secretKey,
        pageId,
        token
      );
      const uploadData = uploadResponse.data;
      swal("Uploaded!", "Market Price Uploaded Successfully!", "success");
      console.log(uploadData);
      }
    } catch (error) {
      console.error(error);
      // Handle errors or use an alert service
    } finally {
      // Always set loading to false
      this.loading = false;
    }
  }
}
