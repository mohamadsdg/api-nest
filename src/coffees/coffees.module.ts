import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffees } from './entities/coffees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([coffees])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
