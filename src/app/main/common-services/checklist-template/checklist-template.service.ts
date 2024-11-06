import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ChecklistTemplateService {

  private apiUrl: string = 'https://readytouse.cloud';

  // Get All Vendor Material Details Checklist
  private vendorDetailsCheckList: string = this.apiUrl + "/VendorDetailsCheckList/v1/GetVendorDetailsCheckList";
  private vendorDetailsCheckListAdd: string = this.apiUrl + "/VendorDetailsCheckList/v1/AddVendorDetailsCheckList";
  private vendorDetailsCheckListDelete: string = this.apiUrl + "/VendorDetailsCheckList/v1/DeleteVendorDetailsCheckList/ID=";
  private addVendorDetailsCheckListQuestion: string = this.apiUrl + "/VendorDetailsCheckListQuestion/v1/AddVendorDetailsCheckListQuestion";

  // Get Checklist Template List
  private checklistTemplateListURL: string = this.apiUrl + "/CheckListTemplate/v1/GetCheckListTemplate";
  private addChecklistTemplateListURL: string = this.apiUrl + "/CheckListTemplate/v1/AddCheckListTemplate";
  private updateChecklistTemplateListURL: string = this.apiUrl + "/CheckListTemplate/v1/UpdateCheckListTemplate";
  private defaultChecklistTemplateListURL: string = this.apiUrl + "/CheckListTemplate/v1/GetCheckListTemplate/ID=";

  // Question Type List
  private getQuestionType: string = this.apiUrl + "/CheckListTemplate/v1/GetQuestionType";

  // CRUD Checklist Question List
  private listQuestionData: string = this.apiUrl + "/CheckListTemplate/v1/GetCheckListTemplateQuestion/TemplateID=";
  private getCheckListQuestion: string = this.apiUrl + "/CheckListQuestion/v1/GetCheckListQuestion/ID=";
  private addQuestionData: string = this.apiUrl + "/CheckListQuestion/v1/AddCheckListQuestion";
  private updateQuestionData: string = this.apiUrl + "/CheckListQuestion/v1/UpdateCheckListQuestion";
  private deleteQuestionData: string = this.apiUrl + "/CheckListQuestion/v1/DeleteCheckListQuestion/ID=";

  // Add & Update Checklist Question Option List
  private addQuestionOptionData: string = this.apiUrl + "/CheckListQuestionOption/v1/AddCheckListQuestionOption";
  private updateQuestionOptionData: string = this.apiUrl + "/CheckListQuestionOption/v1/UpdateCheckListQuestionOption";
  private deleteQuestionOptionData: string = this.apiUrl + "/CheckListQuestionOption/v1/DeleteCheckListQuestionOption/ID=";

  // Checklist Based Vendor ID
  private vendorChecklistBaseOnVendorID: string = this.apiUrl + "/VendorDetailsCheckList/v1/GetVendorDetailsCheckList/VendorID=";
  private answerChecklistQuestion: string = this.apiUrl + "/VendorDetailsCheckListAnswer/v1/AddVendorDetailsCheckListQuestionAnswer";
  private answerChecklistQuestionDocument: string = this.apiUrl + "/VendorDetailsCheckListDocument/v1/AddVendorDetailsCheckListQuestionDocument";

  // Status Changing API
  private answerChecklistQuestionStatus: string = this.apiUrl + "/VendorDetailsCheckListAnswer/v1/UpdateVendorDetailsCheckListQuestionAnswerStatus";

  constructor() { }

  // Save / Update Checklist Template Based on Template ID ( 0 = Save, Else = Update )
  saveChecklist(data: any, token: any, checkListTemplateID: any){
    if (checkListTemplateID == "0") {
      return axios.put(this.addChecklistTemplateListURL, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    } else {
      return axios.post(this.updateChecklistTemplateListURL, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    }
  }

  // Save / Update Checklist Template Question Based on Template Question ID ( 0 = Save, Else = Update )
  saveChecklistQuestion(data: any, token: any, checkListTemplateQuestionID: any){
    if (checkListTemplateQuestionID == "0") {
      return axios.put(this.addQuestionData, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    } else {
      return axios.post(this.updateQuestionData, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    }
  }

  // Save / Update Checklist Template Question Options Based on Template Question Options ID ( 0 = Save, Else = Update )
  saveChecklistQuestionOption(data: any, token: any, checkListTemplateQuestionID: any){
    if (checkListTemplateQuestionID == "0") {
      return axios.put(this.addQuestionOptionData, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    } else {
      return axios.post(this.updateQuestionOptionData, data, {
        headers:{
          "Authorization":"Bearer " + token
        }
      });
    }
  }

  // Get Specific Checklist Template Data Based on Checklist Template ID
  defaultChecklist(token: any, LoginAuditID: any, SecretKey: any, pageId: any, checkListTemplateID: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.defaultChecklistTemplateListURL+checkListTemplateID, data, {
      headers:{
        "Authorization":"Bearer " + token
      }
    });
  }

  // Get All Checklist Template List
  getChecklistTemplateList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.checklistTemplateListURL,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get All Checklist Template List
  getVendorDetailsCheckList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorDetailsCheckList,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get All Checklist Template List
  getVendorDetailsCheckListAdd(data: any, token: any){
    return axios.put(this.vendorDetailsCheckListAdd,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Update All Checklist Template Question List
  updateVendorDetailsCheckListQuestionAdd(data: any, token: any){
    return axios.put(this.addVendorDetailsCheckListQuestion,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Delete Checklist Template List
  getVendorDetailsCheckListDelete(data: any, token: any, vendorDetailsCheckListID: any){
    return axios.delete(this.vendorDetailsCheckListDelete+vendorDetailsCheckListID,{
      headers:{
        "Authorization": "Bearer " + token
      },
      data
    });
  }


  // Delete Checklist Template Question List
  getVendorDetailsCheckListQuestionDelete(data: any, token: any, CheckListQuestionID: any){
    return axios.delete(this.deleteQuestionData+CheckListQuestionID,{
      headers:{
        "Authorization": "Bearer " + token
      },
      data
    });
  }


  // Delete Checklist Template Question Option List
  getVendorDetailsCheckListQuestionOptionDelete(data: any, token: any, QuestionOptionsID: any){
    return axios.delete(this.deleteQuestionOptionData+QuestionOptionsID,{
      headers:{
        "Authorization": "Bearer " + token
      },
      data
    });
  }

  // Get All Checklist Template List
  getChecklistTemplateQuestionList(token: any, LoginAuditID: any, SecretKey: any, pageId: any, templateId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.listQuestionData+templateId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Get All Checklist Template Question List
  getQuestionTypeList(token: any, LoginAuditID: any, SecretKey: any, pageId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getQuestionType,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Get Specific Checklist Template Question Data Based on Checklist Template Question ID
  getChecklistTemplateQuestionData(token: any, LoginAuditID: any, SecretKey: any, pageId: any, questionId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.getCheckListQuestion+questionId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Get Specific Checklist Template Question Data Based on Checklist Template Based on Vendor ID
  getChecklistTemplateVendorBased(token: any, LoginAuditID: any, SecretKey: any, pageId: any, vendorId: any){
    var data = {
      "LoginAuditID": LoginAuditID,
      "SecretKey": SecretKey,
      "PageID": pageId
    }
    return axios.post(this.vendorChecklistBaseOnVendorID+vendorId,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Get Specific Checklist Template Question Data Based on Checklist Template Based on Vendor ID
  saveChecklistQuestionVendorDocument(url: any, data: any, token: any){
    return axios.put(this.answerChecklistQuestionDocument+url,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Get Specific Checklist Template Question Data Based on Checklist Template Based on Vendor ID
  saveChecklistQuestionVendor(data: any, token: any){
    return axios.put(this.answerChecklistQuestion,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }

  // Update Vendor Checklist Question Status
  updateVendorChecklistQuestionStatus(data: any, token: any){
    return axios.post(this.answerChecklistQuestionStatus,data,{
      headers:{
        "Authorization": "Bearer " + token
      },
    });
  }


  // Get Specific Checklist Template Question Option Data Based on Checklist Template Question Option ID


}
