import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { TokenService } from './auth/token.service';

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
}
