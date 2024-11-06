import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchaseRequestListingComponent} from "./purchase-request-listing/purchase-request-listing.component";
import {
  PurchaseRequestNegotiationComponent
} from "./purchase-request-negotiation/purchase-request-negotiation.component";
import {PurchaseRequestContactComponent} from "./purchase-request-contact/purchase-request-contact.component";
import {PurchaseRequestViewComponent} from "./purchase-request-view/purchase-request-view.component";

export const purchaseRequestRoutes: Routes = [
  {
    path: '',
    component: PurchaseRequestListingComponent,
  },
  {
    path: 'view',
    component: PurchaseRequestViewComponent,
  },
  {
    path: 'negotiate',
    component: PurchaseRequestNegotiationComponent,
  },
  {
    path: 'contact',
    component: PurchaseRequestContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(purchaseRequestRoutes)],
  exports: [RouterModule]
})
export class PurchaseRequestRoutingModule { }
