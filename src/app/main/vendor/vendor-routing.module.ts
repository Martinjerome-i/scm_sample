import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VendorsComponent} from "./vendors/vendors.component";
import {VendoraddComponent} from "./vendoradd/vendoradd.component";
import {MateriallistComponent} from "./materiallist/materiallist.component";
import {MaterialaddComponent} from "./materialadd/materialadd.component";
import {MaterialDetailComponent} from "./material-detail/material-detail.component";
import {VendorDocumentComponent} from "./vendor-document/vendor-document.component";
import {VendorNegotiationComponent} from "./vendor-negotiation/vendor-negotiation.component";
import { VendorNegotiationListingComponent } from './vendor-negotiation-listing/vendor-negotiation-listing.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import {VendorMaterialChecklistComponent} from "./vendor-material-checklist/vendor-material-checklist.component";
import {
  VendorMaterialChecklistQuestionComponent
} from "./vendor-material-checklist-question/vendor-material-checklist-question.component";

export const vendorRoutes: Routes = [
  {
    path: '',
    component: VendorsComponent,
  },
  {
    path: 'add',
    component: VendoraddComponent,
  },
  {
    path: 'materialList',
    component: MateriallistComponent,
  },
  {
    path: 'materialAdd',
    component: MaterialaddComponent,
  },
  {
    path: 'materialDetail',
    component: MaterialDetailComponent,
  },
  {
    path: 'vendorDocument',
    component: VendorDocumentComponent,
  },
  {
    path: 'vendorNegotiationListing',
    component: VendorNegotiationListingComponent,
  },
  {
    path: 'vendorNegotiation',
    component: VendorNegotiationComponent,
  },
  {
    path: 'documentUpload',
    component: DocumentUploadComponent,
  },
  {
    path: 'vendorChecklist',
    component: VendorMaterialChecklistComponent,
  },
  {
    path: 'vendorChecklistQuestion',
    component: VendorMaterialChecklistQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(vendorRoutes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
