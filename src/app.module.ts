import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
// import { APP_PIPE } from '@nestjs/core';
// import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common/common.module';
@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRootAsync({
      useFactory: ()=> ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database:  process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ConfigModule.forRoot(),
    CoffeeRatingModule,
    // DatabaseModule.register({
    //    type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
