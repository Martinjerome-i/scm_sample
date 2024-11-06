import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {DocumentsListingComponent} from "./documents-listing/documents-listing.component";
import {DocumentsSharingComponent} from "./documents-sharing/documents-sharing.component";

const routes: Routes = [
  {
    path: '',
    component: DocumentsListingComponent,
  },
  {
    path: 'share',
    component: DocumentsSharingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
