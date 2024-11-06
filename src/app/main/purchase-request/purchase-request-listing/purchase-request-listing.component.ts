import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../common-services/vendor-listing/vendor.service';
import { response } from 'express';
import { error } from 'console';
import { NgFor } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {VendorData} from '../../common-interface/common-interface'
import {MateriallistService} from "../../common-services/vendor-material-listing/materiallist.service";

@Component({
  selector: 'app-purchase-request-listing',
  standalone: true,
  imports: [NgFor,MatPaginatorModule,MatExpansionModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './purchase-request-listing.component.html',
  styleUrl: './purchase-request-listing.component.css'
})

export class PurchaseRequestListingComponent {

  constructor(private router: Router) {}

  toNegotiationList(VendorMaterialMappingDetailsID: any) {
    localStorage.setItem("vendorMaterialMappingDetailsID", VendorMaterialMappingDetailsID.toString());
    // Navigate
    this.router.navigateByUrl('/admin/Vendor/vendorNegotiationListing');
  }

}
