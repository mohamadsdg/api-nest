import {  Module} from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from "./config/coffee.config";
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeesSchema } from './entities/coffees.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Coffee.name,schema:CoffeesSchema}]),ConfigModule.forFeature(coffeeConfig)],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports:[CoffeesService]
})
export class CoffeesModule {}
