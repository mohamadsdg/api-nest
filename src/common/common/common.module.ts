import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../gurds/auth.guard';
import { LoggingMiddleware } from '../middleware/logging.middleware';

@Module({
    imports:[ConfigModule],
    providers:[{provide:APP_GUARD,useClass:AuthGuard}]
})
export class CommonModule implements NestModule {
    configure(consumer:MiddlewareConsumer){
        consumer.apply(LoggingMiddleware).forRoutes('*')
        // consumer.apply(LoggingMiddleware).forRoutes({path:'coffees',method:RequestMethod.POST})
        // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*')
    }
}
