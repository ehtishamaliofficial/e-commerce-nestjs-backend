import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Disable201StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (
          request.method === 'POST' &&
          request.body &&
          request.body.statusCode
        ) {
          response.statusCode = request.body.statusCode;
        } else {
          if (request.method === 'POST' && response.statusCode === 201) {
            response.statusCode = 200;
          }
        }

        return data;
      }),
    );
  }
}
