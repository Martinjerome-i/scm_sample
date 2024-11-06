import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor} from '@angular/common';

import { SidebarserviceService } from './services/sidebarservice.service';
import { error } from 'console';
import { VerifyJsonWebKeyInput } from 'crypto';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  menuList: any = [];

  constructor(private router: Router, private sidebarService: SidebarserviceService) {
    this.getMaterial();
  }

  getMaterial(){

    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");

     this.sidebarService.getData(token, LoginAuditID, SecretKey).then(response=>{
      for (let item of response.data) {
        this.menuList.push({
          "PageName": item['PageList'][0]['PageName'],
          "PageID": item['PageList'][0]['PageID'],
          "MenuID": item['PageList'][0]['MenuID'],
          "PageURL": item['PageList'][0]['PageURL'],
          "PageIcon": item['PageList'][0]['PageIcon'],
        });
      }
      console.log(this.menuList)
    }).catch(error=>{console.log(error)})
  }

  callFunction(pageId: any, PageURL: any) {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");

    // alert(token + " " + LoginAuditID +  ' ' + SecretKey);

    this.sidebarService.getPrivilegesData(token, LoginAuditID, SecretKey, pageId).then(response=>{
      console.log(response.data);
      // Check has permission
      if (response.data.CanView) {
        localStorage.setItem("PageID", pageId);
        console.log(response.data.CanView);
        // Navigate
        this.router.navigateByUrl('/admin'+PageURL);
      } else {
        alert("Not Allowed");
      }
    }).catch(error=>{console.log(error)})
  }

  logoutFunc() {
    var token = localStorage.getItem("token");
    var LoginAuditID = localStorage.getItem("LoginAuditID");
    var SecretKey = localStorage.getItem("SecretKey");

    // alert(token + " " + LoginAuditID +  ' ' + SecretKey);

    this.sidebarService.userLogout(token, LoginAuditID, SecretKey).then(response=>{
      console.log(response.data);
      // Check has permission
      this.router.navigateByUrl('/');
    }).catch(error=>{console.log(error)})
  }
}
