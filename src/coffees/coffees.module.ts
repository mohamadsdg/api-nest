import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffees } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_CONSTANT } from './coffees.constant';

// useClass syntaxt
class ConfigService{}
class ProductionConfigService{}
class DevelopmentConfigService{}

@Module({
  imports: [TypeOrmModule.forFeature([coffees, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    {
      provide:CoffeesService,
      useClass:CoffeesService
    },
    {
      provide: COFFEE_CONSTANT,
      useValue :['caramel','chocolate']
    },
    {
      provide:ConfigService,
      useClass : process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    }
  ],
  exports:[CoffeesService]
})
export class CoffeesModule {}
