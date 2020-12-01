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
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';

// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  defualtFind(@Res() res) {
    res.status(200).send('all coffee from defualtFind');
  }
  // @UsePipes(ValidationPipe)
  @Get('flavors')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // return `all coffee , limit:${limit}, offset:${offset}`;
    console.log('findAll method after instanstion ') //buble up scope
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    // console.log(id, typeof id);
    return this.coffeesService.findOne(id);
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() CreateCoffees: CreateCoffeesDto) {
    // console.log(CreateCoffees instanceof CreateCoffeesDto);
    return this.coffeesService.create(CreateCoffees);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateCoffeesDto: UpdateCoffeesDto) {
    return this.coffeesService.update(id, UpdateCoffeesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
