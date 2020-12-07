import { createParamDecorator ,ExecutionContext} from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator((defualtValue:string,ctx:ExecutionContext)=>{
console.log({defualtValue})
    const request = ctx.switchToHttp().getRequest<Request>()
    return request.protocol

})