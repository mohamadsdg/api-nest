import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../gurds/auth.guard';

@Module({
    imports:[ConfigModule],
    providers:[{provide:APP_GUARD,useClass:AuthGuard}]
})
export class CommonModule {}
