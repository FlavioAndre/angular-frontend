import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public clientId = 'cursoangular';

  constructor(private router: Router
    , private http: HttpClient
    , private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.tokenService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  retrieveToken(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);


    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', Authorization: 'Basic '
        + btoa(this.clientId + ':cursoangular123')
    });
    this.http.post('/api/oauth/token', params.toString(), { headers })
      .subscribe(
        data => this.saveToken(data),
        err => alert('Login inválido!')
      );
  }

  saveToken(token) {
    this.tokenService.setToken(token.access_token);
    console.log('Obtained Access token' + token.access_token);
    this.router.navigate(['/clientes']);

  }

  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer '
        + localStorage.token
    });
    return this.http.get(resourceUrl, { headers });

  }

  checkCredentials() {
    return this.tokenService.getToken();
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }


}
