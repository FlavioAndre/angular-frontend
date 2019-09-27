import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';
import { AuthGuardService } from './auth/auth-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Curso de Angular 8';

  constructor(private authGuardService: AuthGuardService
  ) {
    setTheme('bs4'); // or 'bs4'
  }

  logOff() {
    this.authGuardService.logout();
  }

  isLogOn(){
    return this.authGuardService.hasToken();
  }

}
