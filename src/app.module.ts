import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [    
    CoffeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
    ConfigModule.forRoot(),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
