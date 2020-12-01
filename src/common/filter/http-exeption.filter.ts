import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExeptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

   
    const ctx = host.switchToHttp()
    const rsp = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exeptionRsp = exception.getResponse()
    const error =  typeof exeptionRsp ==='string'? {message:exeptionRsp}:exeptionRsp
    console.log(exception)
    // console.log(host)
    rsp.status(status).json({
      ...error,
      timestamp:new Date().toISOString()
    })
  }
}
