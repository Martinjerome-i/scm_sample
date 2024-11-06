import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {AnsweringComponent} from "./answering/answering.component";

export const vendorChecklistRoutes: Routes = [
  {
    path: '',
    component: ListingComponent,
  },
  {
    path: 'answering',
    component: AnsweringComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(vendorChecklistRoutes)],
  exports: [RouterModule]
})
export class VendorChecklistRoutingModule { }
