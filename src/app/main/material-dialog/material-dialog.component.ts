import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,FormControl} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import { MaterialDialogService } from './service/material-dialog.service';
import swal from "sweetalert";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {materialCommonInterface} from "../common-interface/common-interface";
import {VendorMaterialService} from "../common-services/vendor-material/vendor-material.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {AutocompleteLibModule} from "angular-ng-autocomplete";


@Component({
  selector: 'app-material-dialog',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    MatGridListModule,
    MatDialogModule, MatRadioModule, MatSelect, MatOption, AutocompleteLibModule],
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css'],
})
export class MaterialDialogComponent implements OnInit {

  keyword = "CASNumber";

  materialList: materialCommonInterface [] = [];
  materialSelect: any;

  materialTypeList: any [] = [];
  materialTypeSelect: any;

  materialStatusList: any [] = [];
  materialStatusSelect: any;

  unitTypeList: any [] = [];
  unitTypeSelect: any;

  currencyList: any [] = [];
  currencyNameSelect: any;

  myForm!: FormGroup;
  loading = false;
  submitted = false;

  radioButtons =[
    {Id: 1, name: 'New'},
    {Id: 2, name: 'Existing'},
  ]

  constructor(
    private formBuilder:FormBuilder,
    private materialDialogService: MaterialDialogService,
    private vendorMaterialService: VendorMaterialService,
    public dialog:MatDialog,
    private router: Router
  ){
    this.getMaterial()
  }
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      radio: [1],
      casNumber: ['', Validators.required],
      price: ['', Validators.required],
      materialStatus: ['', Validators.required],
      plant: ['', Validators.required],
      itemNumber: ['', Validators.required],
      materialType: ['', Validators.required],
      currency:['',Validators.required],
      unitType: ['', Validators.required],
      leadTime: ['', Validators.required],
      uploadDocuments: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getData();
  }

  async getData(){
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    console.log("Login service: " + localStorage.getItem('token'));

    await Promise.all([
      this.getDropDownData('getMaterialType',this.materialTypeList,'MaterialTypeID','MaterialTypeName',token,LoginAuditID,SecretKey),
      this.getDropDownData('getMaterialStatus',this.materialStatusList,'MaterialStatusID','MaterialStatusCode',token,LoginAuditID,SecretKey),
      this.getDropDownData('getUnitType',this.unitTypeList,'UnitID','UnitName',token,LoginAuditID,SecretKey),
      this.getDropDownData('getCurrency',this.currencyList,'CurrencyID','CurrencyName',token,LoginAuditID,SecretKey),
    ]);
  }


  async getDropDownData(apiEndpoint: string, list: any[], idKey: string, nameKey: string, token: string | null, loginAuditID: string | null, secretKey: string | null) {
    const requestBody = { "LoginAuditID": loginAuditID, "SecretKey": secretKey };

    try {
      const response = await this.materialDialogService[apiEndpoint](requestBody, token);
      list.push(...response.data.map((item: { [key: string]: any })  => ({ [idKey]: item[idKey], [nameKey]: item[nameKey] })));
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

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

  async casNumberChange() {
    try {
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId = localStorage.getItem("PageID");
      // var VendorId  = localStorage.getItem("VendorId");
      const response = await this.vendorMaterialService.getMaterialId(token, LoginAuditID, SecretKey, pageId, this.materialSelect);

      console.log(response.data['MaterialDescription'])
      // this.f['MaterialID'].setValue(response.data.MaterialID)
      // this.f['casNumber'].setValue(response.data.CASNumber)
      this.f['description'].setValue(response.data['MaterialDescription'])
      this.f['materialStatus'].setValue(response.data['MaterialStatus'])
      this.f['plant'].setValue(response.data.Plant)
      this.f['itemNumber'].setValue(response.data.MaterialNumber)
      this.f['materialType'].setValue(response.data.MaterialTypeName)
      this.f['currency'].setValue(response.data.MaterialTypeName)
      this.f['unitType'].setValue(response.data.UnitName)
    }

    catch(error){
      console.log(error);
    }
  }

     // Assuming you are inside a function where 'event' is a parameter
      uploadMultiFile = async (event: any) => {
      try{
      // Use type assertion to tell TypeScript that 'event.target' is an input element
      const inputElement = event.target as HTMLInputElement;

      // Check if 'inputElement.files' is not null or undefined
      if (inputElement.files) {
        const files: FileList = inputElement.files;
        console.log(files);

        const formData = new FormData();

        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          formData.append('UploadFile', element);

        }
        return formData;
      }
      else {
        // Return null if no files
        return null;
      }

    }
      catch (error) {
        console.error(error);
        // Handle errors or use an alert service
        return null;
      } finally {
        // Always set loading to false
        this.loading = false;
      }

  }

  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

 async  onSubmit() {
  console.log("working");
  this.submitted = true;
  const token = localStorage.getItem("token");
  const loginAuditID = localStorage.getItem("LoginAuditID");
  const secretKey = localStorage.getItem("SecretKey");

  const materialID = localStorage.getItem('materialId');
  const vendorID = localStorage.getItem('vendorId');

  const detailsID = localStorage.getItem("iDetailsID");

    this.loading = true;

    const addMaterialData = {
      "CASNumber": this.f['casNumber'].value,
      "MaterialNumber": this.f['itemNumber'].value,
      "MaterialDescription": this.f['description'].value,
      "MaterialTypeID": this.materialStatusSelect,
      "Plant": this.f['plant'].value,
      "UnitID": this.unitTypeSelect,
    };

  const vendorMaterialMapData = {
    "VendorID": vendorID,
    "MaterialID": materialID
  };

  const dataRequest = {
    "DataRequest": {
      "LoginAuditID": loginAuditID,
      "SecretKey": secretKey,
      "PageID": 2
    }
  };

  const uploadRequest ={
      "LoginAuditID": loginAuditID,
      "SecretKey": secretKey,
      "PageID": 2,
      "iDetailsID": detailsID,
  }

  const addMaterial = {
    ...dataRequest,
    "Material": addMaterialData,
  };
  console.log(addMaterial);

  const vendorMaterial = {
    ...dataRequest,
    "VendorMaterialMapping": [vendorMaterialMapData],
  }
  console.log(vendorMaterial);

  try {
    const materialResponse = await this.materialDialogService.saveMaterial(addMaterial, token);
    const materialId = materialResponse.data['Value'];
    console.log(materialResponse);
    localStorage.setItem("materialId", materialId);

    const mappingResponse = await this.materialDialogService.vendorMaterialMapping(vendorMaterial, token);
    const mappingId = mappingResponse.data[0]['MappingID'];
    console.log(mappingResponse);
    localStorage.setItem("mappingId", mappingId);

    const VendorMaterialMappingDetails = {
      "QuotedPrice": this.f['price'].value,
      "LeadTime": Number.parseInt(this.f['leadTime'].value),
      "MaterialStatusID": this.materialStatusSelect,
      "CurrencyID": this.currencyNameSelect,
      "MappingID": mappingId,
    };

    const vendorMaterialReq = {
      ...dataRequest,
      "VendorMaterialMappingDetails": VendorMaterialMappingDetails
    };
    console.log(vendorMaterialReq);

    const detailsResponse = await this.materialDialogService.vendorMaterialMappingDetails(vendorMaterialReq, token);
    const detailsID = detailsResponse.data['Value'];
    console.log(detailsResponse);
    localStorage.setItem("iDetailsID", detailsID);

    const formData = await this.uploadMultiFile(event);

  // Assuming uploadRequest is defined somewhere
  const uploadResponse = await this.materialDialogService.uploadDocuments(
    formData,
    uploadRequest.LoginAuditID,
    uploadRequest.SecretKey,
    uploadRequest.PageID,
    uploadRequest.iDetailsID,
    token
  );
    const uploadData = uploadResponse.data;
    console.log(uploadData);

    swal("Added!", "Material Added Successfully!", "success");
    // Navigate
    this.router.navigateByUrl('/admin/Material/add');
  } catch (error) {
    console.error(error);
    // Handle errors or use an alert service
  } finally {
    // Always set loading to false
    this.loading = false;
  }
}


  selectEvent(item: any) {
    console.log(item)
    this.materialSelect = item.MaterialID
    this.casNumberChange()
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

