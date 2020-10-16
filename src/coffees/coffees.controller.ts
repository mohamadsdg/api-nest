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
  findOne(@Param('id') id: string) {
    // return `one coffee with id ${id}`;
    return this.coffeesService.findOne(id);
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    // return body;
    // return `This action adds a new coffee ${name}`;
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    // return `this action update #${id} coffee to #${name}`;
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `this action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
