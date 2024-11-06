import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-material-vendor-documents',
  standalone: true,
  imports: [MatPaginatorModule,MatMenuModule,MatIconModule],
  templateUrl: './material-vendor-documents.component.html',
  styleUrl: './material-vendor-documents.component.css'
})
export class MaterialVendorDocumentsComponent {

}
