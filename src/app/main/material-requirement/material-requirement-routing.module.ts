import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MaterialRequirementsListingComponent
} from "./material-requirements-listing/material-requirements-listing.component";
import {MaterialRequirementsAddComponent} from "./material-requirements-add/material-requirements-add.component";
import {
  MaterialRequirementsDocumentsComponent
} from "./material-requirements-documents/material-requirements-documents.component";
import {
  MaterialRequirementsDocumentsUploadComponent
} from "./material-requirements-documents-upload/material-requirements-documents-upload.component";
import {MaterialRequirementsBrComponent} from "./material-requirements-br/material-requirements-br.component";

export const materialRequirementRoutes: Routes = [
  {
    path: '',
    component: MaterialRequirementsListingComponent,
  },
  {
    path: 'list',
    component: MaterialRequirementsBrComponent,
  },
  {
    path: 'add',
    component: MaterialRequirementsAddComponent,
  },
  {
    path: 'documents',
    component: MaterialRequirementsDocumentsComponent,
  },
  {
    path: 'uploadDocument',
    component: MaterialRequirementsDocumentsUploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialRequirementRoutes)],
  exports: [RouterModule]
})
export class MaterialRequirementRoutingModule { }
