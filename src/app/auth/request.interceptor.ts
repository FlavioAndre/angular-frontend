import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpSentEvent } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';
import { HttpProgressEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpUserEvent } from '@angular/common/http';
import { TokenService } from './token.service';
import { LoadingService } from '../share/loading/loading.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private loadingService : LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      req = req.clone({
        setHeaders: {
          'Authorization': `bearer ${token}`,
        }
      });
    }
    return next.handle(req) .pipe(tap(event => {
      if ( event instanceof HttpResponse) {
          this.loadingService.stop();
      } else {
          this.loadingService.start();
      }
  }));
  }
}

