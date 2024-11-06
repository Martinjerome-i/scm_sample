import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vendorRoutes } from "./vendor/vendor-routing.module";
import { materialRoutes } from "./material/material-routing.module";
import {dashboardRoutes} from "./dashboard/dashboard-routing.module";
import {purchaseRequestRoutes} from "./purchase-request/purchase-request-routing.module";
import {requestRoutes} from "./request/request-routing.module";
import {invoiceRoutes} from "./invoice/invoice-routing.module";
import {rolesRoutes} from "./roles/roles-routing.module";
import {purchaseOrderRoutes} from "./purchase-order/purchase-order-routing.module";
import {checklistTemplateRoutes} from "./checklist-template/checklist-template-routing.module";
import {vendorChecklistRoutes} from "./vendor-checklist/vendor-checklist-routing.module";
import {businessRequirementRoutes} from "./business-requirements/business-requirements-routing.module";
import {materialRequirementRoutes} from "./material-requirement/material-requirement-routing.module";

export const mainRoutes: Routes = [
    {
      path: 'Dashboard',
      children: dashboardRoutes,
    },
    {
      path: 'Vendor',
      children: vendorRoutes,
    },
    {
      path: 'Materials',
      children: materialRoutes,
    },
    {
      path: 'PurchaseRequest',
      children: purchaseRequestRoutes,
    },
    {
      path: 'PurchaseOrder',
      children: purchaseOrderRoutes,
    },
    {
      path: 'Request',
      children: requestRoutes,
    },
    {
      path: 'Invoice',
      children: invoiceRoutes,
    },
    {
      path: 'CheckListTemplate',
      children: checklistTemplateRoutes,
    },
    {
      path: 'Checklist',
      children: vendorChecklistRoutes,
    },
    {
      path: 'Role',
      children: rolesRoutes,
    },
    {
      path: 'BusinessRequirements',
      children: businessRequirementRoutes,
    },
    {
      path: 'MaterialRequirements',
      children: materialRequirementRoutes,
    },
    // {
    //   path: 'Users',
    //   children: vendorRoutes,
    // },
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
