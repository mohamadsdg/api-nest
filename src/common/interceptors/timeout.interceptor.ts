import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable,TimeoutError,throwError } from 'rxjs';
import { timeout,catchError } from "rxjs/operators";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(1000),catchError(er =>{
      console.log(er)
      if (er instanceof TimeoutError) {
        return throwError(new RequestTimeoutException())
      }
      return throwError(er)
    })
    )
  }
}
