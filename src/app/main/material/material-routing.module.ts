import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {MaterialListingComponent} from "./material-listing/material-listing.component";
import {MaterialAddComponent} from "./material-add/material-add.component";
import {MaterialVendorNegotiationComponent} from "./material-vendor-negotiation/material-vendor-negotiation.component";
import {MaterialVendorListComponent} from "./material-vendor-list/material-vendor-list.component";
import {
  MaterialVendorQualificationComponent
} from "./material-vendor-qualification/material-vendor-qualification.component";
import {MaterialVendorDocumentsComponent} from "./material-vendor-documents/material-vendor-documents.component";
import {MaterialMarketPriceComponent} from "./material-market-price/material-market-price.component";
import {MaterialRequirementComponent} from "./material-requirement/material-requirement.component";
import {MaterialSendDocumentComponent} from "./material-send-document/material-send-document.component";
import {VendorNegotiationComponent} from "../vendor/vendor-negotiation/vendor-negotiation.component";
import {
  VendorNegotiationListingComponent
} from "../vendor/vendor-negotiation-listing/vendor-negotiation-listing.component";

export const materialRoutes: Routes = [
  {
    path: '',
    component: MaterialListingComponent,
  },
  {
    path: 'add',
    component: MaterialAddComponent,
  },
  {
    path: 'vendor',
    component: MaterialVendorListComponent,
  },
  {
    path: 'vendorNegotiationListing',
    component: VendorNegotiationListingComponent,
  },
  {
    path: 'negotiate',
    component: VendorNegotiationComponent,
  },
  {
    path: 'qualification',
    component: MaterialVendorQualificationComponent,
  },
  {
    path: 'document',
    component: MaterialVendorDocumentsComponent,
  },
  {
    path: 'marketPrice',
    component: MaterialMarketPriceComponent,
  },
  {
    path: 'requirement',
    component: MaterialRequirementComponent,
  },
  {
    path: 'sendDocument',
    component: MaterialSendDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialRoutes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
