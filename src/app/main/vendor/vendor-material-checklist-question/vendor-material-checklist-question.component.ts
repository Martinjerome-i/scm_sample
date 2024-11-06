import {Component, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {
  checklistTemplateQuestionCommonInterface,
  checklistTemplateQuestionOptionCommonInterface
} from "../../common-interface/common-interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";

@Component({
  selector: 'app-vendor-material-checklist-question',
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
  templateUrl: './vendor-material-checklist-question.component.html',
  styleUrl: './vendor-material-checklist-question.component.css'
})
export class VendorMaterialChecklistQuestionComponent  implements OnInit {

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
}

