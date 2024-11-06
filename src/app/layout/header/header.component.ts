import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  firstName: any = ""
  roleCode: any = ""

  constructor() {
    this.firstName = localStorage.getItem("firstName");
    this.roleCode = localStorage.getItem("roleCode");
  }

  ngOnInit(): void { }
}
