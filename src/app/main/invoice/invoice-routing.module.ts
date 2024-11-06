import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {InvoiceListingComponent} from "./invoice-listing/invoice-listing.component";
import {InvoiceUploadingComponent} from "./invoice-uploading/invoice-uploading.component";

export const invoiceRoutes: Routes = [
  {
    path: '',
    component: InvoiceListingComponent,
  },
  {
    path: 'upload',
    component: InvoiceUploadingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoiceRoutes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
