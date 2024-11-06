import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchaseOrderListingComponent} from "./purchase-order-listing/purchase-order-listing.component";
import {PurchaseOrderUpdateComponent} from "./purchase-order-update/purchase-order-update.component";
import {PurchaseOrderApprovalComponent} from "./purchase-order-approval/purchase-order-approval.component";

export const purchaseOrderRoutes: Routes = [
  {
    path: '',
    component: PurchaseOrderListingComponent,
  },
  {
    path: 'update',
    component: PurchaseOrderUpdateComponent,
  },
  {
    path: 'approval',
    component: PurchaseOrderApprovalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(purchaseOrderRoutes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
