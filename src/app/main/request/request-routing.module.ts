import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {RequestListingComponent} from "./request-listing/request-listing.component";
import {RequestUpdateComponent} from "./request-update/request-update.component";
import {RequestDocumentListingComponent} from "./request-document-listing/request-document-listing.component";

export const requestRoutes: Routes = [
  {
    path: '',
    component: RequestListingComponent,
  },
  {
    path: 'update',
    component: RequestUpdateComponent,
  },
  {
    path: 'documents',
    component: RequestDocumentListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(requestRoutes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
