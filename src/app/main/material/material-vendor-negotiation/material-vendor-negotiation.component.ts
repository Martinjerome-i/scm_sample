import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
// import {VendoraddService} from "./service/vendoradd.service";
import swal from "sweetalert";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-material-vendor-negotiation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    MatGridListModule,
    MatDialogModule],
  templateUrl: './material-vendor-negotiation.component.html',
  styleUrl: './material-vendor-negotiation.component.css'
})
export class MaterialVendorNegotiationComponent {

}
