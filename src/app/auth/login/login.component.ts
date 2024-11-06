import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LoginServiceService} from "./services/loginservice.service";
import {NgClass} from "@angular/common";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  loading = false;
  submitted = false;

  // Initializing LocalStorage
  // localStorage = require('localStorage');

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginServiceService,
   // private alertService: AlertService
  ){
    // console.log("Login service: " + this.localStorage.getItem('token'));
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

   onSubmit() {
       this.submitted = true;

       // reset alerts on submit
       //this.alertService.clear();

       // stop here if form is invalid
       if (this.form.invalid) {
           return;
       }

       var token = localStorage.getItem("token");

       this.loading = true;
       this.loginService
           .login(this.f['username'].value, this.f['password'].value,
             token
           )
           .then(response => {
            // Login successful
            const user = response.data;
            var loginAuditId = user['LoginAuditID'];
            var secretKey = user['SecretKey'];
            var defaultPageURL = user['DefaultPageURL'];
            var firstName = user['FirstName'];
            var roleCode = user['RoleCode'];
            var userID = user['UserID'];
            console.log(user);
             localStorage.setItem("LoginAuditID", loginAuditId);
             localStorage.setItem("SecretKey", secretKey);
             localStorage.setItem("firstName", firstName);
             localStorage.setItem("roleCode", roleCode);
             // localStorage.setItem("userID", userID);
             localStorage.setItem("userID", "12");
            // Navigate
            this.router.navigateByUrl('/admin'+defaultPageURL);
          })
          .catch((error: any) => {
            // Handle login errors
            // this.alertService.error(error);
            console.log(error); // Remove this line after implementing alertService
            this.loading = false;
          })
          .finally(() => {
            // Always set loading to false
            this.loading = false;
          });
  }

  // onSubmitted() {
  //   alert(this.localStorage.getItem('token'));
  // }
}
