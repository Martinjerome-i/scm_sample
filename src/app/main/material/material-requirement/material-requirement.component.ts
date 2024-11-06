import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginServiceService} from "../../../auth/login/services/loginservice.service";
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-material-requirement',
  standalone: true,
    imports: [
        NgForOf,MatTabsModule,MatPaginatorModule,MatExpansionModule,MatIconModule,MatMenuModule,MatButtonModule,MatDialogModule
    ],
  templateUrl: './material-requirement.component.html',
  styleUrl: './material-requirement.component.css'
})
export class MaterialRequirementComponent {
  constructor(
    private router: Router,
    // private alertService: AlertService
  ){
    // console.log("Login service: " + this.localStorage.getItem('token'));
  }
  callSendVendor() {
    this.router.navigateByUrl('/admin/Materials/sendDocument');
  }
}
