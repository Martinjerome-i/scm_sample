import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DocumentUploadService} from "../../vendor/document-upload/service/document-upload.service";
import swal from "sweetalert";
import {CommonModule, NgClass} from "@angular/common";
import {BRDocumentService} from "../../common-services/bd/brdocument-service.service";

@Component({
  selector: 'app-business-requirements-add',
  standalone: true,
  imports: [NgClass,CommonModule,MatGridListModule,FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './business-requirements-add.component.html',
  styleUrl: './business-requirements-add.component.css'
})
export class BusinessRequirementsAddComponent implements OnInit {
  myForm!:FormGroup;
  loading = false;
  submitted = false;
  RoleCode: any;
  files: File[]

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private brDocumentService : BRDocumentService,
    
  ){this.RoleCode== localStorage.getItem('roleCode')}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      DocumentName: ['', Validators.required],
      Description: ['', Validators.required],
      uploadDocument: ['', Validators.required],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }


  async onSubmit() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.loading = true;

    var data = {
      "DocumentName": this.f['DocumentName'].value,
      "Description": this.f['Description'].value,
    };
    var addBR = {
      "DataRequest": {
        "LoginAuditID": loginAuditID,
        "SecretKey": secretKey,
        "PageID": pageId
      },
      "BusinessRequirement": data,
    }
    console.log(addBR);
    try {
      this.brDocumentService
        .adBRDocumentAdd(addBR, token)
        .then(response => {
          // Login successful
          const user = response.data;
          const iBusinessRequirementID = user['Value'];
          console.log(user);
          // localStorage.setItem("vendorId", vendorId);
          // swal("Added!", "Vendor Added Successfully!", "success");
          this.addDocument(iBusinessRequirementID)
        })
        .catch((error) => {
          // Handle login errors
          swal("Failed!", error.toString() , "error");
          // this.alertService.error(error);
          console.log(error); // Remove this line after implementing alertService
          this.loading = false;
        })
        .finally(() => {
          // Always set loading to false
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
      // Handle errors or use an alert service
    } finally {
      // Always set loading to false
      this.loading = false;
    }
  }

  async addDocument(iBusinessRequirementID: any) {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.loading = true;

    try {

      if (this.files) {
        let formParams = new FormData();

        for (var file of this.files) {
          console.log(file)
          formParams.append('UploadFile', file);
        }
        var url = "?LoginAuditID=" + loginAuditID + "&SecretKey=" + secretKey + "&PageID=" + pageId + "&iBusinessRequirementID=" + iBusinessRequirementID
        // formParams.append('UploadFile', this.files);
        // console.log(formParams.getAll('UploadFile[]'))
        // Assuming uploadRequest is defined somewhere
        const uploadResponse = await this.brDocumentService.adBRUploadDocument(
          url,
          formParams,
          token
        );
        const uploadData = uploadResponse.data;
        swal("Success!", "Business Requirement Created Successfully!", "success");
        // Navigate
        this.router.navigateByUrl('/admin/BusinessRequirements');
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

  uploadMultiFile = async (event: any)  => {
    this.files = event.target.files
    console.log(this.files)
  }

  submitSend() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.loading = true;

    var data = {
      "BusinessRequirementStatusID": 2,
      "DocumentName": this.f['DocumentName'].value,
      "Description": this.f['Description'].value,
    };
    var addBR = {
      "DataRequest": {
        "LoginAuditID": loginAuditID,
        "SecretKey": secretKey,
        "PageID": pageId
      },
      "BusinessRequirement": data,
    }
    console.log(addBR);
    try {
      this.brDocumentService
        .adBRDocumentAdd(addBR, token)
        .then(response => {
          // Login successful
          const user = response.data;
          const iBusinessRequirementID = user['Value'];
          console.log(user);
          // localStorage.setItem("vendorId", vendorId);
          // swal("Added!", "Vendor Added Successfully!", "success");
          this.addDocument(iBusinessRequirementID)
        })
        .catch((error) => {
          // Handle login errors
          swal("Failed!", error.toString() , "error");
          // this.alertService.error(error);
          console.log(error); // Remove this line after implementing alertService
          this.loading = false;
        })
        .finally(() => {
          // Always set loading to false
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
      // Handle errors or use an alert service
    } finally {
      // Always set loading to false
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('/admin/BusinessRequirements');
  }
}
