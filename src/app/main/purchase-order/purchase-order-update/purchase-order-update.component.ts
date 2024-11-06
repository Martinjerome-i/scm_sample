import { Component } from '@angular/core';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {FormGroup, FormsModule} from "@angular/forms";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatStep,
  MatStepContent,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-purchase-order-update',
  standalone: true,
  imports: [
    AutocompleteLibModule,
    FormsModule,
    MatAccordion,
    MatButton,
    MatExpansionPanel,
    MatGridList,
    MatGridTile,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgForOf,
    NgIf,
    MatStepContent
  ],
  templateUrl: './purchase-order-update.component.html',
  styleUrl: './purchase-order-update.component.css'
})
export class PurchaseOrderUpdateComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

}
