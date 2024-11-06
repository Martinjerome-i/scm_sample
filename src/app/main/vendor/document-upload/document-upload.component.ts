
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatGridListModule} from '@angular/material/grid-list';
import swal from "sweetalert";
import {DocumentUploadService} from "./service/document-upload.service";

import {CommonModule, NgClass} from "@angular/common";
import {response} from "express";

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [NgClass,CommonModule,MatGridListModule,FormsModule, ReactiveFormsModule,
    RouterLink,],
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.css'
})
export class DocumentUploadComponent implements OnInit {
  myForm!:FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentUploadService : DocumentUploadService,
  ){}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      documentName: ['', Validators.required],
      description: ['', Validators.required],
      uploadDocument: ['', Validators.required],
    });

}
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }


  onSubmit() {
    console.log("working");
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();
    swal("Uploaded!", "Document Uploaded Successfully!", "success").then(
      value => {
        // Navigate
        this.router.navigateByUrl('/admin/Vendor/vendorDocument');
      }
    );
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }
  }
 uploadMultiFile(event: any){
  var token = localStorage.getItem("token");
  var LoginAuditID = localStorage.getItem("LoginAuditID");
  var SecretKey = localStorage.getItem("SecretKey");
  var PageId = localStorage.getItem("PageID");
  var detailsID = localStorage.getItem("vendorMaterialMappingDetailsID");

  const files: FileList = event.target.files;
  console.log(files);

  const formdata =  new FormData();

  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    formdata.append('UploadFile',element);
  }

  this.documentUploadService.uploadDocuments(formdata,LoginAuditID,SecretKey,PageId,token,detailsID).then(response=>{
    const user=response.data;
    console.log(user);
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
