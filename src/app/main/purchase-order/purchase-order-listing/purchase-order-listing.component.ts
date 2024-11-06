import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SplashServiceService} from "../../../auth/splash/services/splashservice.service";

@Component({
  selector: 'app-purchase-order-listing',
  standalone: true,
  imports: [],
  templateUrl: './purchase-order-listing.component.html',
  styleUrl: './purchase-order-listing.component.css'
})
export class PurchaseOrderListingComponent {

  constructor(private router: Router) {
    //
  }

  gotoPOMaterialList() {
    // Navigate
    this.router.navigateByUrl('/admin/PurchaseOrder/update');
  }
}
