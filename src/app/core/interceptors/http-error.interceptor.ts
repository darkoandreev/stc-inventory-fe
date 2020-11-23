import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '../services/toaster/toaster.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToasterService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = `Error Code: ${errorResponse.status},  Message: ${
          errorResponse.error.message || 'Server error'
        }`;
        this.toast.showToaster(errorMessage, 'danger');
        return throwError(errorMessage);
      })
    );
  }
}
