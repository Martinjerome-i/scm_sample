import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LoaderComponent} from "./loader/loader/loader.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SCM';
}
