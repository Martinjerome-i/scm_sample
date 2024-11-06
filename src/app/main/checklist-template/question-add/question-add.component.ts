import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ActivatedRoute, Router} from "@angular/router";
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {
  checklistTemplateQuestionOptionCommonInterface,
  questionTypeCommonInterface,
  questionTypeOptionCommonInterface
} from "../../common-interface/common-interface";
import swal from "sweetalert";

@Component({
  selector: 'app-question-add',
  standalone: true,
  imports: [
    FormsModule,
    MatGridList,
    MatGridTile,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './question-add.component.html',
  styleUrl: './question-add.component.css'
})
export class QuestionAddComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  // negotiationStatusLastData: any;

  questionTypeOptionList: questionTypeOptionCommonInterface [] = [];
  questionTypeOptionListUpdate: checklistTemplateQuestionOptionCommonInterface [] = [];

  questionTypeList: questionTypeCommonInterface [] = [];
  questionTypeSelect: any;

  currentSelectedQuestionType: number = 0;
  currentSelectedQuestionId: any = "0";

  checkListQuestionID: any = "0";

  date: Date;

  isUpdated: boolean

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private checklistTemplateService: ChecklistTemplateService,
  ){
    this.getData()
    var checkListQuestionID = localStorage.getItem("checkListQuestionID");
    if (checkListQuestionID == "0") {
      this.isUpdated = false
    } else {
      this.isUpdated = true
      this.checkListQuestionID = checkListQuestionID
      this.setDefaultData(checkListQuestionID)
    }
  }

  async setDefaultData(checkListQuestionID: any) {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");

    try {
      const response = await this.checklistTemplateService.getChecklistTemplateQuestionData(token, LoginAuditID, SecretKey, pageId, checkListQuestionID);

      this.f['QuestionTitle'].setValue(response.data['QuestionTitle'])
      this.questionTypeSelect = response.data['QuestionTypeID']
      this.currentSelectedQuestionId = response.data['QuestionTypeID']

      this.questionTypeOptionListUpdate = response.data['Options'].map((itemOption:checklistTemplateQuestionOptionCommonInterface) =>({
        "QuestionOptionsID": itemOption.QuestionOptionsID,
        "CheckListQuestionID": itemOption.CheckListQuestionID,
        "QuestionValue": itemOption.QuestionValue,
        "QuestionOptionDisplayOrder": itemOption.QuestionOptionDisplayOrder,
        "IsActive": itemOption.IsActive,
        "LastUpdatedBy": itemOption.LastUpdatedBy,
        "LastUpdatedOn": itemOption.LastUpdatedOn
      }))

      this.isUpdated = true
    } catch (error) {
      console.log(error);
    }
  }

  async getData(){
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");

    try {
      const response = await this.checklistTemplateService.getQuestionTypeList(token, LoginAuditID, SecretKey, pageId);
      this.questionTypeList = response.data.map((item:questionTypeCommonInterface) =>({
        "QuestionTypeID": item.QuestionTypeID,
        "QuestionType": item.QuestionType,
        "QuestionTypeDescription": item.QuestionTypeDescription,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      QuestionTitle: ['', Validators.required],
      QuestionDescription: ['', Validators.required],
      AnswerBox: ['', Validators.required],
      Paragraph: ['', Validators.required],
      Checkbox: ['', Validators.required],
      RadioButton: ['', Validators.required],
      FileType: ['', Validators.required],
      DateType: ['', Validators.required],
      DateTimeType: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var checkListTemplateID = localStorage.getItem("checkListTemplateID");

    this.loading = true;

    if (this.currentSelectedQuestionId == "0") {

      if (this.isUpdated) {
        this.updateQuestion(checkListTemplateID, LoginAuditID, SecretKey, pageId, token)
      } else {

        var data = {
          "CheckListTemplateID": checkListTemplateID,
          "QuestionTitle": this.f['QuestionTitle'].value,
          "QuestionDescription": "",
          "QuestionTypeID": this.currentSelectedQuestionType,
          "QuestionDisplayOrder": "1",
          "IsActive": true
        };

        var addQuestion = {
          "DataRequest": {
            "LoginAuditID": LoginAuditID,
            "SecretKey": SecretKey,
            "PageID": pageId
          },
          "CheckListQuestions": [
            data
          ],
        }
        this.checklistTemplateService.saveChecklistQuestion(addQuestion, token, "0")
          .then(response => {
            localStorage.setItem("checkListQuestionID", response.data[0]['CheckListQuestionID']);
            this.currentSelectedQuestionId = response.data[0]['CheckListQuestionID']
            if (this.currentSelectedQuestionType == 3 || this.currentSelectedQuestionType == 4) {
              //
            } else {
              this.pageReload()
              // swal("Added!", "Question Added Successfully!", "success");
            }
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
    } else {
      if (this.isUpdated) {
        this.updateQuestion(checkListTemplateID, LoginAuditID, SecretKey, pageId, token)
      }
    }
  }


  updateQuestion(checkListTemplateID: any, LoginAuditID: any, SecretKey: any, pageId: any, token: any) {
    if (this.isUpdated) {
      console.log("working")
      var dataUpdate = {
        "CheckListQuestionID": Number.parseInt(this.checkListQuestionID),
        "CheckListTemplateID": checkListTemplateID,
        "QuestionTitle": this.f['QuestionTitle'].value,
        "QuestionDescription": "",
        "QuestionTypeID": this.questionTypeSelect,
        "QuestionDisplayOrder": "1",
        "IsActive": true
      };

      var updateQuestion = {
        "DataRequest": {
          "LoginAuditID": LoginAuditID,
          "SecretKey": SecretKey,
          "PageID": pageId
        },
        "CheckListQuestions": [
          dataUpdate
        ],
      }

      console.log(updateQuestion)

      this.checklistTemplateService.saveChecklistQuestion(updateQuestion, token, checkListTemplateID)
        .then(response => {
          swal("Update!", "Question Updated Successfully!", "success");
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

  setQuestionType() {
    this.currentSelectedQuestionType = this.questionTypeSelect;
  }

  setOption(optionType: number) {

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    this.currentSelectedQuestionId = localStorage.getItem("checkListQuestionID");

    this.questionTypeOptionList.push(
      {
        "CheckListQuestionID": Number(this.currentSelectedQuestionId),
        "QuestionValue": optionType == 3 ? this.f['RadioButton'].value : this.f['Checkbox'].value,
        "QuestionOptionDisplayOrder": 1,
        "IsActive": true
      }
    )
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "QuestionOptions": [
        {
          "CheckListQuestionID": Number(this.currentSelectedQuestionId),
          "QuestionValue": optionType == 3 ? this.f['RadioButton'].value : this.f['Checkbox'].value,
          "QuestionOptionDisplayOrder": 1,
          "IsActive": true
        }
      ],
    }
    this.checklistTemplateService.saveChecklistQuestionOption(addVendor, token, "0")
      .then(response => {
        // admin/CheckListTemplate/questionAdd
        if (optionType == 4) {
          this.f['Checkbox'].setValue("")
        } else {
          this.f['RadioButton'].setValue("")
        }
        this.setDefaultData(this.currentSelectedQuestionId)
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

  pageReload() {
    // Navigate
    // this.router.navigateByUrl('/admin/CheckListTemplate/questionAdd');
    window.location.reload();
    swal("Added!", "Question Added Successfully!", "success");
  }

  backPage() {
    // Navigate
    this.router.navigateByUrl('/admin/CheckListTemplate/question');
  }

  removeOptionUpdate(QuestionOptionsID: number, CheckListQuestionID: number) {
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
        callFunction(deleteDataRequest, token, QuestionOptionsID, CheckListQuestionID)
      } else {
        swal("Cancelled", "Your record is safe", "error");
      }
    });

    const callFunction = (deleteDataRequest: any, token: any, QuestionOptionsID: any, CheckListQuestionID: any) => {
      this.getChecklistTemplateQuestionOptionService(deleteDataRequest, token, QuestionOptionsID, CheckListQuestionID)
    }
  }

  getChecklistTemplateQuestionOptionService(deleteDataRequest: any, token: any, QuestionOptionsID: any, CheckListQuestionID: any) {
    this.checklistTemplateService
      .getVendorDetailsCheckListQuestionOptionDelete(deleteDataRequest, token, QuestionOptionsID)
      .then(response => {
        // Login successful
        swal("Success!", "Deleted Record Successfully" , "success");
        this.setDefaultData(CheckListQuestionID)
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
