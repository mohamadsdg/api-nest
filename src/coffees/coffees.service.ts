import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { coffees } from './entities/coffees.entity';

@Injectable()
export class CoffeesService {
  private coffes: coffees[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavor: ['vanilla', 'chocolate'],
    },
  ];

  findAll() {
    return this.coffes;
  }
  findOne(id: string) {
    const coffee = this.coffes.find(coffee => coffee.id === +id);
    if (!coffee) {
      //   throw new HttpException('not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException(`coffees #${id} not found`);
    }
    return coffee;
  }
  create(createCoffeeDto: any) {
    this.coffes.push(createCoffeeDto);
    return createCoffeeDto;
  }
  update(id: string, updateCoffeeDto: any) {
    const exsitingCoffee = this.findOne(id);
    if (exsitingCoffee) {
      //update the existing entry
    }
  }
  remove(id: string) {
    const coffeeIndex = this.coffes.findIndex(coffee => coffee.id == +id);
    if (coffeeIndex > 0) {
      this.coffes.splice(coffeeIndex, 1);
    }
  }
}
