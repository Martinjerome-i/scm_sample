import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SplashServiceService {
  // private apiUrl: string = 'http://scmapi.corestructuralconsultants.com';
  private apiUrl: string = 'https://readytouse.cloud';
  private authURL: string = this.apiUrl + "/Authenticate/v1/authenticate";

  constructor() { }

  tokenGeneration() {
    return axios.post(this.authURL, {
      "UserName":"scmapistaging@scm.com",
      "UserPassword":"ZGp9HRBEV5+dyOmin/RR04IWRrBAisaQVG/0cNvtzmBNdcDSk5+WzY9Meyl4cW5nEqil3oYNFRpe0Bcq+5T5kMq5wQ=="
    });
  }
}
