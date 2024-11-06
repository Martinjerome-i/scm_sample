import {Component, Inject, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {SplashServiceService} from "./services/splashservice.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
  Logo: string = "Logo";

  constructor(private router: Router, private splashService: SplashServiceService) {
    this.authAPICall();
  }

  authAPICall() {
    this.splashService.tokenGeneration()
      .then(response => {
        localStorage.setItem('token', response.data.Token);
        this.callLoginPage();
      })
      .catch(error => {
        console.log(error);
      });
  }

  callLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
