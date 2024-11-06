import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {AutocompleteLibModule} from "angular-ng-autocomplete";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    AutocompleteLibModule
  ]
})
export class MainModule { }
