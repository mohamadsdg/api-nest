import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coffees } from './entities/coffees.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { ConfigService } from '@nestjs/config';
// import { COFFEE_CONSTANT } from './coffees.constant';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(coffees)
    private CoffeesRepository: Repository<coffees>,
    @InjectRepository(Flavor)
    private FlavorRepository: Repository<Flavor>,
    private connection: Connection,
    // @Inject(COFFEE_CONSTANT) coffeeConst:string[],
    private readonly configService:ConfigService
  ) {
    // console.log(coffeeConst)
    // console.log("instance")

    const db_user = this.configService.get<string>('DB_HییOST','localhost');
    console.log(db_user)
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.FlavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.FlavorRepository.create({ name });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.CoffeesRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }
  async findOne(id: number) {
    const coffee = await this.CoffeesRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      //   throw new HttpException('not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException(`coffees #${id} not found`);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeesDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavor.map(x => this.preloadFlavorByName(x)),
    );

    const coffee = this.CoffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.CoffeesRepository.save(coffee);
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeesDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavor.map(x => this.preloadFlavorByName(x)),
    );

    const coffee = await this.CoffeesRepository.preload({
      id: id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`coffees #${id} not found`);
    }
    return this.CoffeesRepository.save(coffee);
  }
  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.CoffeesRepository.remove(coffee);
  }

  async recommendCoffee(coffee: coffees) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
