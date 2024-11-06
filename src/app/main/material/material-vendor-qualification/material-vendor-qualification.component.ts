import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {qualificationStatusCommonInterface} from "../../common-interface/common-interface";

@Component({
  selector: 'app-material-vendor-qualification',
  standalone: true,
  imports: [MatPaginatorModule, MatMenuModule, MatIconModule, FormsModule, NgForOf],
  templateUrl: './material-vendor-qualification.component.html',
  styleUrl: './material-vendor-qualification.component.css'
})
export class MaterialVendorQualificationComponent {

  qualificationStatusList: qualificationStatusCommonInterface [] = []
  qualificationStatusSelect: any
  qualificationStatusJson = [
    {
      "qualificationID": 1,
      "questionName": "On-Hold",
    },
    {
      "qualificationID": 2,
      "questionName": "In-Progress",
    },
    {
      "qualificationID": 3,
      "questionName": "Completed",
    },
  ]

  constructor() {
    //
  }

}
