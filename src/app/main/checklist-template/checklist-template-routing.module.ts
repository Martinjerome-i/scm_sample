import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {AddComponent} from "./add/add.component";
import {QuestionListingComponent} from "./question-listing/question-listing.component";
import {QuestionAddComponent} from "./question-add/question-add.component";

export const checklistTemplateRoutes: Routes = [
  {
    path: '',
    component: ListingComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'question',
    component: QuestionListingComponent,
  },
  {
    path: 'questionAdd',
    component: QuestionAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(checklistTemplateRoutes)],
  exports: [RouterModule]
})
export class ChecklistTemplateRoutingModule { }
