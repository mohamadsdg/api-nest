import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  defualtFind(@Res() res) {
    res.status(200).send('all coffee from defualtFind');
  }

  @Get('flavors')
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    // return `all coffee , limit:${limit}, offset:${offset}`;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // return `one coffee with id ${id}`;
    console.log(id, typeof id);
    return this.coffeesService.findOne(id);
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() CreateCoffees: CreateCoffeesDto) {
    // return body;
    // return `This action adds a new coffee ${name}`;
    console.log(CreateCoffees instanceof CreateCoffeesDto);
    return this.coffeesService.create(CreateCoffees);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateCoffeesDto: UpdateCoffeesDto) {
    // return `this action update #${id} coffee to #${name}`;
    return this.coffeesService.update(id, UpdateCoffeesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // return `this action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
