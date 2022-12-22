import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../services/api.service'
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //  add token to header on successful response
    const token = this.apiService.getToken();
    // console.log(`got to interceptor for token ${token}`)
    if (token) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`)
      });
      console.log(`logging final request as ${JSON.stringify(request)}`);
  }
  return next.handle(request)
  .pipe(
    tap((evt) =>
    {
      console.log(evt)
      if (evt instanceof HttpResponse) {
        //do something with response

        if (evt.status === 401){
          //handle 401 error
          this.apiService.logout();
        }
      }
    }
    ),
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {
        //handle 401 error
        this.apiService.setLoadingStatus(false);
        this.apiService.logout();

      }
      return throwError(err);
    }

  )
  );
}
}
