import {Component, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {
  checklistTemplateQuestionCommonInterface,
  checklistTemplateQuestionOptionCommonInterface
} from "../../common-interface/common-interface";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import swal from "sweetalert";
import {MatPaginator} from "@angular/material/paginator";
import {MatGridListModule, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-request-update',
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
  templateUrl: './request-update.component.html',
  styleUrl: './request-update.component.css'
})
export class RequestUpdateComponent implements OnInit {

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

  approveRejectStatusQuestion(CheckListQuestionID: number, status: number) {
    //2 - Approve
    //4 - Reject
    console.log("working");

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "VendorDetailsCheckListQuestionAnswer": [
        {
          "VendorDetailsCheckListQuestionAnswerID": CheckListQuestionID,
          "VendorDetailsCheckListAnswerStatusID": status,
        }
      ],
    }
    console.log(addVendor);
    this.checklistTemplateService
      .updateVendorChecklistQuestionStatus(addVendor, token)
      .then(response => {
        // Login successful
        const user = response.data;
        var vendorId = user['Value'];
        console.log(user);
        localStorage.setItem("vendorId", vendorId);
        swal("Updated!", "Status Updated Successfully!", "success");
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", 'Failed to Update Status', "error");
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
      })
      .finally(() => {
        // Always set loading to false
      });
  }

  approveChecklist() {
    //
  }

  rejectChecklist() {
    //
  }
}
