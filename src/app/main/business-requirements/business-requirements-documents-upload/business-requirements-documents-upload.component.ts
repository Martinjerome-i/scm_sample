import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ActivatedRoute, Router} from "@angular/router";
import {BRDocumentService} from "../../common-services/bd/brdocument-service.service";
import swal from "sweetalert";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-business-requirements-documents-upload',
  standalone: true,
  imports: [
    FormsModule,
    MatGridList,
    MatGridTile,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './business-requirements-documents-upload.component.html',
  styleUrl: './business-requirements-documents-upload.component.css'
})
export class BusinessRequirementsDocumentsUploadComponent implements OnInit {
  myForm!:FormGroup;
  loading = false;
  submitted = false;
  files: File[]

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private brDocumentService : BRDocumentService,
  ){}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      uploadDocument: ['', Validators.required],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  async addDocument() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var brId = localStorage.getItem("businessRequirementID");

    this.loading = true;

    try {

      if (this.files) {
        let formParams = new FormData();

        for (var file of this.files) {
          console.log(file)
          formParams.append('UploadFile', file);
        }
        var url = "?LoginAuditID=" + loginAuditID + "&SecretKey=" + secretKey + "&PageID=" + pageId + "&iBusinessRequirementID=" + brId
        // Assuming uploadRequest is defined somewhere
        const uploadResponse = await this.brDocumentService.adBRUploadDocument(
          url,
          formParams,
          token
        );
        const uploadData = uploadResponse.data;
        swal("Success!", "Business Requirement Created Successfully!", "success");
        // Navigate
        this.router.navigateByUrl('/admin/BusinessRequirements/documents');
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

  goBack() {
    this.router.navigateByUrl('/admin/BusinessRequirements/documents');
  }
}
