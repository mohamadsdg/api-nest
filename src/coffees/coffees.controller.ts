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

@Controller('coffees')
export class CoffeesController {
  @Get()
  defualtFind(@Res() res) {
    res.status(200).send('all coffee from defualtFind');
  }

  @Get('flavors')
  findAll(@Query() paginationQuery): string {
    const { limit, offset } = paginationQuery;
    return `all coffee , limit:${limit}, offset:${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `one coffee with id ${id}`;
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body('name') name: string): string {
    // return body;
    return `This action adds a new coffee ${name}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string): string {
    return `this action update #${id} coffee to #${name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action removes #${id} coffee`;
  }
}
