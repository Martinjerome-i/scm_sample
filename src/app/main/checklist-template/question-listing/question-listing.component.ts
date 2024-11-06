import {Component, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialaddService} from "../../vendor/materialadd/service/materialadd.service";
import {NegotiationService} from "../../common-services/negotiation/negotiation.service";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {
  checklistTemplateQuestionCommonInterface,
  checklistTemplateQuestionOptionCommonInterface
} from "../../common-interface/common-interface";
import swal from "sweetalert";

@Component({
  selector: 'app-question-listing',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    NgForOf,
    MatMenuTrigger,
    FormsModule,
    MatGridListModule,
    MatGridTile,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './question-listing.component.html',
  styleUrl: './question-listing.component.css'
})
export class QuestionListingComponent implements OnInit {

  checklistQuestionList : checklistTemplateQuestionCommonInterface [] = []

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private checklistTemplateService: ChecklistTemplateService,
  ){
    this.getTemplateQuestions()
  }

  async getTemplateQuestions() {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");
    var checkListTemplateID= localStorage.getItem("checkListTemplateID");

    const response = await this.checklistTemplateService.getChecklistTemplateQuestionList(token,LoginAuditID,SecretKey,pageId,checkListTemplateID);

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

  ngOnInit(): void {
    //
  }

  addQuestion() {
    localStorage.setItem("checkListQuestionID", "0");
    // Navigate
    this.router.navigateByUrl('/admin/CheckListTemplate/questionAdd');
  }

  updateQuestion(CheckListQuestionID: number) {
    localStorage.setItem("checkListQuestionID", CheckListQuestionID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/CheckListTemplate/questionAdd');
  }

  deleteQuestion(CheckListQuestionID: number) {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");

    var deleteDataRequest = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }

    swal({
      title: "Are you sure?",
      text: "If you deleted the record you'll not get it back",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        callFunction(deleteDataRequest, token, CheckListQuestionID)
      } else {
        swal("Cancelled", "Your record is safe", "error");
      }
    });

    const callFunction = (deleteDataRequest: any, token: any, CheckListQuestionID: any) => {
      this.getChecklistTemplateService(deleteDataRequest, token, CheckListQuestionID)
    }
  }

  getChecklistTemplateService(deleteDataRequest: any, token: any, CheckListQuestionID: any) {
    this.checklistTemplateService
      .getVendorDetailsCheckListQuestionDelete(deleteDataRequest, token, CheckListQuestionID)
      .then(response => {
        // Login successful
        swal("Success!", "Deleted Record Successfully" , "success");
        this.getTemplateQuestions()
        // Navigate
        // this.router.navigateByUrl('/admin/Vendor/add');
      })
      .catch((error) => {
        // Handle login errors

        swal({
          title: 'Completed!',
          text: 'Record deleted successfully shortlisted!',
          icon: 'success'
        }).then(function() {
          console.log("working")
        });
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }
}
