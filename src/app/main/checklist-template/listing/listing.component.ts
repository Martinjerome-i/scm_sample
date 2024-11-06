import { Component } from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {checklistCommonInterface} from "../../common-interface/common-interface";

@Component({
  selector: 'app-listing',
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
    MatMenuTrigger
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  checkLisTemplateList: checklistCommonInterface[] = [];

  constructor(private router: Router, private checklistTemplateService: ChecklistTemplateService) {
    this.getChecklist()
  }

  async getChecklist(){
    try{
      var token = localStorage.getItem("token");
      var LoginAuditID = localStorage.getItem("LoginAuditID");
      var SecretKey = localStorage.getItem("SecretKey");
      var pageId= localStorage.getItem("PageID");

      const response = await this.checklistTemplateService.getChecklistTemplateList(token,LoginAuditID,SecretKey,pageId);

      this.checkLisTemplateList = response.data.map((item:checklistCommonInterface) =>({
        "CheckListTemplateID": item.CheckListTemplateID,
        "TemplateCode": item.TemplateCode,
        "TemplateName": item.TemplateName,
        "TemplateDescription": item.TemplateDescription,
        "IsActive": item.IsActive,
        "LastUpdatedBy": item.LastUpdatedBy,
        "LastUpdatedOn": item.LastUpdatedOn,
      }));

      console.log(this.checkLisTemplateList);

    }
    catch(error){
      console.log(error);
    }

  }

  onEdit(CheckListTemplateID: number) {
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

  addQuestion(CheckListTemplateID: number) {
    localStorage.setItem('checkListTemplateID', CheckListTemplateID.toString());
    // Navigate to URL
    this.router.navigateByUrl('/admin/CheckListTemplate/question');
  }
}
