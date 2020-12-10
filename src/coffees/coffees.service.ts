import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';
// import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ConfigType } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name)
    private readonly CoffeeModel:Model<Coffee>,
    @Inject(coffeeConfig.KEY)
    private readonly configService:ConfigType<typeof coffeeConfig>
  ) {
    const db_foo = this.configService.foo
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.CoffeeModel.find().skip(offset).limit(limit).exec()
  }
  async findOne(id: string) {
    const coffee = await this.CoffeeModel.findOne({_id:id}).exec();   
    if (!coffee) {
      throw new NotFoundException(`coffees #${id} not found`);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeesDto) {
    const coffee = await new this.CoffeeModel(createCoffeeDto)
    return coffee.save()
  }
  async update(id: string, updateCoffeeDto: UpdateCoffeesDto) {
    const coffee = this.CoffeeModel.findOneAndUpdate({_id:id},{$set:updateCoffeeDto},{new:true}).exec();
    if (!coffee) {
      throw new NotFoundException(`coffees #${id} not found`);
    }
    return coffee;
  }
  async remove(id: string) {
    const coffee = await this.findOne(id)
    return coffee.remove()
  }
}
