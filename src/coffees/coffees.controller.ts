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
  UseFilters,
  SetMetadata,
} from '@nestjs/common';
import {  timeout } from 'rxjs/operators';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { HttpExeptionFilter } from 'src/common/filter/http-exeption.filter';
import { CoffeesService } from './coffees.service';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';
import { ParsIntPipeCustom } from 'src/common/pipes/pars-int.pipe';


// @UsePipes(ValidationPipe)
@UseFilters(HttpExeptionFilter)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  defualtFind(@Res() res) {
    res.status(200).send('all coffee from defualtFind');
  }
  // @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic',true)
  @Public()
  @Get('flavors')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // return `all coffee , limit:${limit}, offset:${offset}`;
    // console.log('findAll method after instanstion ') //buble up scope
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id',ParsIntPipeCustom) id: number) {
    // request time out interceptor
    // await new Promise(resolve=>setTimeout(resolve, 1500))
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
