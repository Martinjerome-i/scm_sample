import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BRDocumentService} from "../../common-services/bd/brdocument-service.service";
import swal from "sweetalert";
import {CommonModule, NgClass} from "@angular/common";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {materialCommonInterface} from "../../common-interface/common-interface";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import {MRDocumentService} from "../../common-services/mr/mrdocument.service";

@Component({
  selector: 'app-material-requirements-add',
  standalone: true,
  imports: [NgClass, CommonModule, MatGridListModule, FormsModule, ReactiveFormsModule, RouterLink, AutocompleteLibModule],
  templateUrl: './material-requirements-add.component.html',
  styleUrl: './material-requirements-add.component.css'
})
export class MaterialRequirementsAddComponent implements OnInit {
  myForm!:FormGroup;
  loading = false;
  submitted = false;
  RoleCode: any;
  files: File[]

  keyword = "CASNumber";

  materialList: materialCommonInterface [] = [];
  materialSelect: any;

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mrDocumentService : MRDocumentService,
    private vendorMaterialService: VendorMaterialService,
  ){
    this.RoleCode = localStorage.getItem('roleCode')
    this.getMaterial()
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      DocumentName: ['', Validators.required],
      Description: ['', Validators.required],
      uploadDocument: ['', Validators.required],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  async getMaterial(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

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
    }
    catch(error){
      console.log(error);
    }
  }

  async onSubmit() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var materialRequirementID = localStorage.getItem("materialRequirementID");

    this.loading = true;

    var addMR = {
      "DataRequest": {
        "LoginAuditID": loginAuditID,
        "SecretKey": secretKey,
        "PageID": pageId
      },
      "MaterialRequirementMaterial": [
        {
          "MaterialRequirementID": materialRequirementID,
          "MaterialID": this.materialSelect,
        }
      ],
    }
    console.log(addMR);
    try {
      this.mrDocumentService
        .adMRMaterialDataAdd(addMR, token)
        .then(response => {
          // Login successful
          const user = response.data;
          const iMaterialRequirementID = user[0]['MaterialRequirementID'];
          // console.log(iMaterialRequirementID);
          // localStorage.setItem("vendorId", vendorId);
          // swal("Added!", "Vendor Added Successfully!", "success");
          this.addDocument(iMaterialRequirementID)
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

  async addDocument(iMaterialRequirementID: any) {
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
        var url = "?LoginAuditID=" + loginAuditID + "&SecretKey=" + secretKey + "&PageID=" + pageId + "&iMaterialRequirementID=" + iMaterialRequirementID
        // formParams.append('UploadFile', this.files);
        // console.log(formParams.getAll('UploadFile[]'))
        // Assuming uploadRequest is defined somewhere
        const uploadResponse = await this.mrDocumentService.adMRUploadDocument(
          url,
          formParams,
          token
        );
        const uploadData = uploadResponse.data;
        swal("Success!", "Business Requirement Created Successfully!", "success");
        // Navigate
        this.goBack()
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
    this.router.navigateByUrl('/admin/MaterialRequirements/list');
  }


  selectEvent(item: any) {
    console.log(item)
    this.materialSelect = item.MaterialID
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // do something when input is focused
  }
}
