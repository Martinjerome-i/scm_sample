import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import swal from "sweetalert";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {formatDate, NgClass} from "@angular/common";

interface ChecklistTemplateLastData {
  CheckListTemplateID: number,
  TemplateCode: string,
  TemplateName: string,
  IsActive: boolean,
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  checklistLastData: any;

  // Initializing LocalStorage
  // localStorage = require('localStorage');

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private checklistTemplateService: ChecklistTemplateService,

    public dialog:MatDialog,
    // private alertService: AlertService
  ) {
    // console.log("Login service: " + this.localStorage.getItem('token'));
    this.getChecklistDefaultData()
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      TemplateCode: ['', Validators.required],
      TemplateName: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async getChecklistDefaultData() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var checkListTemplateID = localStorage.getItem("checkListTemplateID");

    try {
      const response = await this.checklistTemplateService.defaultChecklist(token, LoginAuditID, SecretKey, pageId, checkListTemplateID);

      console.log(response.data)
      this.checklistLastData = {
        'CheckListTemplateID': response.data['CheckListTemplateID'],
        'TemplateCode': response.data['TemplateCode'],
        'TemplateName': response.data['TemplateName'],
      };
      this.f['TemplateCode'].setValue(this.checklistLastData.TemplateCode);
      this.f['TemplateName'].setValue(this.checklistLastData.TemplateName);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var checkListTemplateID = localStorage.getItem("checkListTemplateID");
    var data = {};

    this.loading = true;

    if (checkListTemplateID == "0") {
      data = {
        "TemplateCode": this.f['TemplateCode'].value,
        "TemplateName": this.f['TemplateName'].value,
        "IsActive":true
      };
    } else {
      data = {
        "CheckListTemplateID":checkListTemplateID,
        "TemplateCode": this.f['TemplateCode'].value,
        "TemplateName": this.f['TemplateName'].value,
        "IsActive":true
      };
    }

    var addChecklist = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": 3
      },
      "CheckListTemplate": data,
    }
    console.log(addChecklist);
    this.checklistTemplateService
      .saveChecklist(addChecklist, token, checkListTemplateID)
      .then(response => {
        // Login successful
        swal("Added!", checkListTemplateID == "0" ?
          "Checklist Added Successfully!" : "Checklist Updated Successfully!", "success").then(
          value => {
            // Navigate
            this.router.navigateByUrl('/admin/CheckListTemplate/');
          }
        );
      })
      .catch((error: any) => {
        // Handle login errors
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
        this.loading = false;
      })
      .finally(() => {
        // Always set loading to false
        this.loading = false;
      });
  }
}
