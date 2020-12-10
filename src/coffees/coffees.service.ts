import {
  Inject,
  Injectable,
} from '@nestjs/common';
// import { coffees } from './entities/coffees.entity';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';
// import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ConfigType } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(coffeeConfig.KEY)
    private readonly configService:ConfigType<typeof coffeeConfig>
  ) {
    const db_foo = this.configService.foo
  }

  private async preloadFlavorByName(name: string){
    // const existingFlavor = await this.FlavorRepository.findOne({ name });
    // if (existingFlavor) {
    //   return existingFlavor;
    // }
    // return this.FlavorRepository.create({ name });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // return this.CoffeesRepository.find({
    //   relations: ['flavors'],
    //   skip: offset,
    //   take: limit,
    // });
  }
  async findOne(id: number) {
    // const coffee = await this.CoffeesRepository.findOne(id, {
    //   relations: ['flavors'],
    // });
    // if (!coffee) {
    //   //   throw new HttpException('not found', HttpStatus.NOT_FOUND);
    //   throw new NotFoundException(`coffees #${id} not found`);
    // }
    // return coffee;
  }
  async create(createCoffeeDto: CreateCoffeesDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavor.map(x => this.preloadFlavorByName(x)),
    );

    // const coffee = this.CoffeesRepository.create({
    //   ...createCoffeeDto,
    //   flavors,
    // });
    // return this.CoffeesRepository.save(coffee);
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeesDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavor.map(x => this.preloadFlavorByName(x)),
    );

    // const coffee = await this.CoffeesRepository.preload({
    //   id: id,
    //   ...updateCoffeeDto,
    //   flavors,
    // });
    // if (!coffee) {
    //   throw new NotFoundException(`coffees #${id} not found`);
    // }
    // return this.CoffeesRepository.save(coffee);
  }
  async remove(id: number) {
    const coffee = await this.findOne(id);
    // return this.CoffeesRepository.remove(coffee);
  }
}
