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
import {ChecklistTemplateService} from "../../common-services/checklist-template/checklist-template.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import swal from "sweetalert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-answering',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgIf,
    MatMenuTrigger,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './answering.component.html',
  styleUrl: './answering.component.css'
})
export class AnsweringComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  currentQuestionIndex = 0
  currentQuestionId = 0

  questionTitle: string
  optionValue: string
  questionId: number
  questionType: number
  optionList: checklistTemplateQuestionOptionCommonInterface[]

  questionList: checklistTemplateQuestionCommonInterface[]

  selectedCheckbox: string[] = []
  files: File[]

  constructor(
    private checklistTemplateService: ChecklistTemplateService,
    private formBuilder:FormBuilder,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      inputOption: ['', Validators.required]
    });
    this.getQuestionList()
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      inputAnswer: ['', Validators.required],
      inputTextArea: ['', Validators.required],
      inputOption: ['', Validators.required],
      inputCheckbox: ['', Validators.required],
      inputFile: ['', Validators.required],
      inputDate: ['', Validators.required],
      inputDateTime: ['', Validators.required],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async getQuestionList() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId= localStorage.getItem("PageID");
    var checkListTemplateID= localStorage.getItem("vendorMaterialMappingDetailsID");

    console.log("checkListTemplateID" + checkListTemplateID)

    const response = await this.checklistTemplateService.getChecklistTemplateQuestionList(token,LoginAuditID,SecretKey,pageId,checkListTemplateID);

    console.log(response.data)
    this.questionList = response.data['CheckListQuestions'].map((item:checklistTemplateQuestionCommonInterface) =>({
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
    // console.log(this.questionList[this.currentQuestionIndex])
    this.questionType = this.questionList[this.currentQuestionIndex].QuestionTypeID
    this.questionTitle = this.questionList[this.currentQuestionIndex].QuestionTitle
    this.optionList = this.questionList[this.currentQuestionIndex].Options
    this.questionId = this.questionList[this.currentQuestionIndex].CheckListQuestionID
    console.log(this.questionId)
  }

  uploadMultiFile = async (event: any)  => {
    this.files = event.target.files
    console.log(this.files)
  }

  onSubmit() {
    if (this.questionType == 5) {
      this.answerQuestionFile()
    } else {
      this.answerQuestion(this.questionType)
    }
  }

  async answerQuestion(questionType: any) {
    console.log("working");
    this.submitted = true;

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");

    this.loading = true;
    var data = {}

    if (questionType == 1) {
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.f['inputAnswer'].value,
      }
    } else if (questionType == 2) {
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.f['inputTextArea'].value,
      }
    } else if (questionType == 3) {
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.optionValue,
      }
    } else if (questionType == 4) {
      this.optionValue = ""
      for (var i of this.selectedCheckbox) {
        console.log(i)
        this.optionValue += (i + ",")
      }
      console.log(this.optionValue)
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.optionValue,
      }
    } else if (questionType == 6) {
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.f['inputDate'].value,
      }
    } else if (questionType == 7) {
      data = {
        "VendorDetailsCheckListQuestionID": this.questionId,
        "VendorDetailsAnswer": this.f['inputDateTime'].value,
      }
    }
    var addVendor = {
      "DataRequest": {
        "LoginAuditID": LoginAuditID,
        "SecretKey": SecretKey,
        "PageID": pageId
      },
      "VendorDetailsCheckListQuestionAnswer": [data],
    }
    console.log(addVendor)
    this.checklistTemplateService
      .saveChecklistQuestionVendor(addVendor, token)
      .then(response => {
        // Login successful
        const user = response.data;
        this.setupQuestion()
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", error.toString(), "error");
        // this.alertService.error(error);
        console.log(error); // Remove this line after implementing alertService
        this.loading = false;
      })
      .finally(() => {
        // Always set loading to false
        this.loading = false;
      });
  }

  async answerQuestionFile() {
    this.submitted = true;
    const token = localStorage.getItem("token");
    const loginAuditID = localStorage.getItem("LoginAuditID");
    const secretKey = localStorage.getItem("SecretKey");
    var pageId = localStorage.getItem("PageID");
    var quesId = this.questionId;

    this.loading = true;

    try {

      if (this.files) {
        let formParams = new FormData();

        for (var file of this.files) {
          console.log(file)
          formParams.append('UploadFile', file);
        }
        var url = "?LoginAuditID=" + loginAuditID + "&SecretKey=" + secretKey + "&PageID=" + pageId + "&iVendorDetailsCheckListQuestionID=" + quesId
        // Assuming uploadRequest is defined somewhere
        const uploadResponse = await this.checklistTemplateService.saveChecklistQuestionVendorDocument(
          url,
          formParams,
          token
        );
        const uploadData = uploadResponse.data;
        console.log(uploadData);
        this.setupQuestion()
      }
    } catch (error) {
      console.error(error);
      // Handle errors or use an alert service
    } finally {
      // Always set loading to false
      this.loading = false;
    }
  }

  setupQuestion() {
    this.currentQuestionIndex += 1
    if (this.questionList.length == this.currentQuestionIndex) {
      swal("Success!", "Checklist submitted successfully", "success");
    } else {
      this.questionId = this.questionList[this.currentQuestionIndex].CheckListQuestionID
      this.questionType = this.questionList[this.currentQuestionIndex].QuestionTypeID
      this.questionTitle = this.questionList[this.currentQuestionIndex].QuestionTitle
      this.optionList = this.questionList[this.currentQuestionIndex].Options
      this.selectedCheckbox = []
      this.optionValue = ""
      this.f['inputAnswer'].setValue("")
      this.f['inputCheckbox'].setValue("")
      this.f['inputOption'].setValue("")
      this.f['inputTextArea'].setValue("")
      this.f['inputDate'].setValue("")
      this.f['inputDateTime'].setValue("")
    }
  }

  onRadioSelected(QuestionValue: string) {
    this.optionValue = QuestionValue
    console.log(this.optionValue)
  }

  onCheckbox(QuestionOptionsID: any) {
    // this.selectedCheckbox.push(QuestionOptionsID.toString())

    if (this.selectedCheckbox.includes(QuestionOptionsID.toString())) {
      const index = this.selectedCheckbox.indexOf(QuestionOptionsID.toString(), 0);
      this.selectedCheckbox.splice(index, 1);
    } else {
      this.selectedCheckbox.push(
        QuestionOptionsID.toString()
      )
    }
    console.log(this.selectedCheckbox)
  }
}
