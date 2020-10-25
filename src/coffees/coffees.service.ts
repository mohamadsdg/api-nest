import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coffees } from './entities/coffees.entity';
import { Repository } from 'typeorm';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(coffees)
    private CoffeesRepository: Repository<coffees>,
  ) {}

  findAll() {
    return this.CoffeesRepository.find({
      relations: ['flavors'],
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
  create(createCoffeeDto: CreateCoffeesDto) {
    const coffee = this.CoffeesRepository.create(createCoffeeDto);
    return this.CoffeesRepository.save(coffee);
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeesDto) {
    const coffee = await this.CoffeesRepository.preload({
      id: id,
      ...updateCoffeeDto,
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
}
