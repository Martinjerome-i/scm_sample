import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
import {RolesListingComponent} from "./roles-listing/roles-listing.component";
import {RolesAddComponent} from "./roles-add/roles-add.component";
import {RolesProcessComponent} from "./roles-process/roles-process.component";

export const rolesRoutes: Routes = [
  {
    path: '',
    component: RolesProcessComponent,
  },
  {
    path: 'listing',
    component: RolesListingComponent,
  },
  {
    path: 'add',
    component: RolesAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rolesRoutes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
