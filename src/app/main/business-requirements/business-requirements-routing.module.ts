import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {
  BusinessRequirementsListingComponent
} from "./business-requirements-listing/business-requirements-listing.component";
import {BusinessRequirementsAddComponent} from "./business-requirements-add/business-requirements-add.component";
import {
  BusinessRequirementsDocumentsComponent
} from "./business-requirements-documents/business-requirements-documents.component";
import {
  BusinessRequirementsDocumentsUploadComponent
} from "./business-requirements-documents-upload/business-requirements-documents-upload.component";

export const businessRequirementRoutes: Routes = [
  {
    path: '',
    component: BusinessRequirementsListingComponent,
  },
  {
    path: 'add',
    component: BusinessRequirementsAddComponent,
  },
  {
    path: 'documents',
    component: BusinessRequirementsDocumentsComponent,
  },
  {
    path: 'uploadDocument',
    component: BusinessRequirementsDocumentsUploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(businessRequirementRoutes)],
  exports: [RouterModule]
})
export class BusinessRequirementsRoutingModule { }
