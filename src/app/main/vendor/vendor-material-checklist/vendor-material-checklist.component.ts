import {Component, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {
  checklistCommonInterface, checklistTemplateQuestionCommonInterface, checklistTemplateQuestionOptionCommonInterface,
  materialCommonInterface,
  vendorCommonInterface, vendorMaterialCommonInterface
} from "../../common-interface/common-interface";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {VendorMaterialService} from "../../common-services/vendor-material/vendor-material.service";
import swal from "sweetalert";

@Component({
  selector: 'app-vendor-material-checklist',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatTab,
    MatTabGroup,
    NgForOf,
    MatMenuTrigger,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatStepLabel,
    MatStepperPrevious,
    MatStepperNext,
    MatGridList,
    MatGridTile,
    NgClass,
    AutocompleteLibModule,
    NgIf
  ],
  templateUrl: './vendor-material-checklist.component.html',
  styleUrl: './vendor-material-checklist.component.css'
})
export class VendorMaterialChecklistComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  keywordVendor = "CompanyName";
  keywordMaterial = "CASNumber";
  keywordTemplate = "TemplateCode";

  checklistQuestionList : checklistTemplateQuestionCommonInterface [] = []

  materialList: materialCommonInterface [] = [];
  materialSelect: any;

  vendorList: vendorCommonInterface [] = [];
  vendorSelect: any;

  templateList: checklistCommonInterface [] = [];
  templateSelect: any;

  selectedQuestionList: string[] = []
  selectedQuestionListRequest: any[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private checklistTemplateService: ChecklistTemplateService,
    private vendorMaterialService: VendorMaterialService,
  ) {
    this.getVendor()
    this.getChecklist()
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      //
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

  async getMaterial(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      console.log(this.vendorSelect)

      const response = await this.vendorMaterialService.getVendorDataId(token,LoginAuditID,SecretKey,pageId, this.vendorSelect);

      console.log(response.data)
      this.materialList = response.data.map((item:vendorMaterialCommonInterface) =>({
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
    }
    catch(error){
      console.log(error);
    }
  }

  async getVendor(){
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
    }
    catch(error){
      console.log(error);
    }
  }


  async getChecklist(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.checklistTemplateService.getChecklistTemplateList(token,LoginAuditID,SecretKey,pageId);

      this.templateList = response.data.map((item:checklistCommonInterface) =>({
        "CheckListTemplateID": item.CheckListTemplateID,
        "TemplateCode": item.TemplateCode,
        "TemplateName": item.TemplateName,
        "TemplateDescription": item.TemplateDescription,
        "IsActive": item.IsActive,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn,
      }));

      console.log(this.templateList);

    }
    catch(error){
      console.log(error);
    }

  }

  async getTemplateQuestions() {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");

    const response = await this.checklistTemplateService.getChecklistTemplateQuestionList(token,LoginAuditID,SecretKey,pageId,this.templateSelect);

    this.checklistQuestionList = response.data['CheckListQuestions'].map((item:checklistTemplateQuestionCommonInterface) =>({
      "CheckListQuestionID": item.CheckListQuestionID,
      "CheckListTemplateID": item.CheckListTemplateID,
      "QuestionTitle": item.QuestionTitle,
      "QuestionDescription": item.QuestionDescription,
      "QuestionTypeID": item.QuestionTypeID,
      "QuestionType": item.QuestionType,
      "QuestionDisplayOrder": item.QuestionDisplayOrder,
      "IsActive": item.IsActive,
      "LastUpdatedBy": item.LastUpdatedBy,
      "LastUpdatedOn": item.LastUpdatedOn,
      "Options": item.Options.map((itemOption:checklistTemplateQuestionOptionCommonInterface) =>({
        "QuestionOptionsID": itemOption.QuestionOptionsID,
        "CheckListQuestionID": itemOption.CheckListQuestionID,
        "QuestionValue": itemOption.QuestionValue,
        "QuestionOptionDisplayOrder": itemOption.QuestionOptionDisplayOrder,
        "IsActive": itemOption.IsActive,
        "LastUpdatedBy": itemOption.LastUpdatedBy,
        "LastUpdatedOn": itemOption.LastUpdatedOn
      }))
    }));

    console.log("checklistTemplateService")
    console.log(this.checklistQuestionList)
  }

  // Save Vendor Material Against Template
  selectVendorMaterialTemplate() {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    var addVendorMaterialChecklistData = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "VendorDetailsCheckList": {
        "VendorMaterialMappingDetailsID": this.materialSelect,
        "CheckListTemplateID": this.templateSelect
      },
    }

    console.log(addVendorMaterialChecklistData)

    this.checklistTemplateService
      .getVendorDetailsCheckListAdd(addVendorMaterialChecklistData, token)
      .then(response => {
        // Login successful
        const user = response.data;
        console.log(user);
        localStorage.setItem("vendorDetailsCheckListID", user['Value'].toString())
        this.getTemplateQuestions()
        // Navigate
        // this.router.navigateByUrl('/admin/Vendor/add');
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", error.toString() , "error");
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }

  // Changed Question Section
  changeQuestionSection(CheckListQuestionID: number) {
    console.log(this.selectedQuestionList.includes(CheckListQuestionID.toString()))
    if (this.selectedQuestionList.includes(CheckListQuestionID.toString())) {
      const index = this.selectedQuestionList.indexOf(CheckListQuestionID.toString(), 0);
      this.selectedQuestionList.splice(index, 1);
      console.log(index)
    } else {
      this.selectedQuestionList.push(
        CheckListQuestionID.toString()
      )
    }
    // console.log(this.selectedQuestionList)
  }

  // Save Vendor Material Against Template
  selectVendorMaterialTemplateQuestion() {
    var vendorDetailsCheckListID = localStorage.getItem("vendorDetailsCheckListID")

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    for (var selectedQuestion of this.selectedQuestionList) {
      this.selectedQuestionListRequest.push({
        "VendorDetailsCheckListID": vendorDetailsCheckListID,
        "CheckListQuestionID": selectedQuestion
      })
    }

    var addVendorMaterialChecklistData = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "VendorDetailsCheckListQuestion": this.selectedQuestionListRequest,
    }

    console.log(addVendorMaterialChecklistData)

    this.checklistTemplateService
      .updateVendorDetailsCheckListQuestionAdd(addVendorMaterialChecklistData, token)
      .then(response => {
        // Navigate
        swal("Success!", "Vendor Checklist Created" , "success").then(
          value => {
            this.redirectVendor()
          }
        );
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", error.toString() , "error");
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }

  redirectVendor() {
    this.router.navigateByUrl('/admin/Vendor');
  }

  /*onEdit(CheckListTemplateID: number) {
    localStorage.setItem('checkListTemplateID', CheckListTemplateID.toString());
    // Navigate to URL
    this.router.navigateByUrl('/admin/CheckListTemplate/add');
  }

  onDelete(CheckListTemplateID: number) {
    //
  }

  addChecklist() {
    localStorage.setItem('checkListTemplateID', '0');
    // Navigate to URL
    this.router.navigateByUrl('/admin/CheckListTemplate/add');
  }

  selectTemplate(CheckListTemplateID: number) {
    localStorage.setItem('checkListTemplateID', CheckListTemplateID.toString());
    // Navigate to URL
    this.router.navigateByUrl('/admin/Vendor/vendorChecklistQuestion');
  }*/


  selectEventVendor(item: any) {
    console.log(item)
    this.vendorSelect = item.VendorID
    this.getMaterial()
    // do something with selected item
  }

  selectEventMaterial(item: any) {
    console.log(item)
    this.materialSelect = item.VendorMaterialMappingDetailsID
    this.getMaterial()
    // do something with selected item
  }

  selectEventTemplate(item: any) {
    console.log(item)
    this.templateSelect = item.CheckListTemplateID
    // do something with selected item
  }

  onChangeSearchVendor($event: any) {
    //
  }

  onChangeSearchMaterial($event: any) {
    //
  }

  onChangeSearchTemplate($event: any) {
    //
  }

  onFocusedVendor($event: void) {
    //
  }

  onFocusedMaterial($event: void) {
    //
  }

  onFocusedTemplate($event: void) {
    //
  }
}
