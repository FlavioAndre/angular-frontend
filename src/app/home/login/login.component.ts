import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../auth/auth-guard.service';
import { TokenService } from '../../auth/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private router: Router
    , private authGuardService: AuthGuardService
    , private tokenService: TokenService
    , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tokenService.removeToken();

    this.formulario = this.formBuilder.group({
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  LogOn() {
    this.authGuardService.retrieveToken(this.formulario.get('email').value, this.formulario.get('password').value);
  }
}
