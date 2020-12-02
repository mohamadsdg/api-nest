import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector:Reflector,private readonly config:ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {    
    const isPublic = this.reflector.get(IS_PUBLIC_KEY,context.getHandler()) 
    if (isPublic) return true;
    const ctx = context.switchToHttp().getRequest<Request>()
    return ctx.headers.authorization === this.config.get("API_KEY")

    // return true;
  }
}
