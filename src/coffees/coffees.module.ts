import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffees } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
// import { COFFEE_CONSTANT } from './coffees.constant';
// import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

// useClass syntaxt
// class ConfigService{}
// class ProductionConfigService{}
// class DevelopmentConfigService{}

// useFactory syntaxt 
// @Injectable()
// export class CoffeBrandsFactory {
//   create(){
//     return ['caramel','chocolate'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([coffees, Flavor, Event]),ConfigModule],
  controllers: [CoffeesController],
  providers: [
    {
      provide:CoffeesService,
      useClass:CoffeesService
    },
    // {
    //   provide: COFFEE_CONSTANT,
    //   useValue :['caramel','chocolate']
    // },
    // {
    //   provide:ConfigService,
    //   useClass : process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    // }
    // CoffeBrandsFactory,
    // {
    //   provide:COFFEE_CONSTANT,
    //   useFactory:(brandFactory:CoffeBrandsFactory)=>{
    //    return  brandFactory.create()
    //   },
    //   inject:[CoffeBrandsFactory]
    // }
    // {
    //   provide:COFFEE_CONSTANT,
    //   useFactory : async (connection:Connection):Promise<string[]>=>{
    //   // const coffeBrands = connection.query('SELECT * ...')
    //   const coffeBrands = await Promise.resolve(['caramel','chocolate'])
    //   console.log("[!] Async Factory")
    //   return coffeBrands
    //   },
    //   inject:[Connection],
    //   scope:Scope.DEFAULT
    // }
  ],
  exports:[CoffeesService]
})
export class CoffeesModule {}
