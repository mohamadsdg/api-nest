import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  Patch,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { HttpExeptionFilter } from 'src/common/filter/http-exeption.filter';
import { CoffeesService } from './coffees.service';
import { CreateCoffeesDto } from './dto/create-coffees.dto';
import { UpdateCoffeesDto } from './dto/update-coffees.dto';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import {ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Coffee')
// @UsePipes(ValidationPipe)
@UseFilters(HttpExeptionFilter)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  defualtFind(@Res() res) {
    res.status(200).send('all coffee from defualtFind');
  }

  @Public()
  @Get('flavors')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // return `all coffee , limit:${limit}, offset:${offset}`;
    return this.coffeesService.findAll(paginationQuery);
  }

  // @ApiResponse({status:HttpStatus.FORBIDDEN,description:'Forbbiden'})
  @ApiForbiddenResponse({description:'Forbbiden'})
  @Get(':id')
  async findOne(@Protocol('https') protocol:string, @Param('id') id: string) {
    console.log(protocol)
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() CreateCoffees: CreateCoffeesDto) {
    return this.coffeesService.create(CreateCoffees);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeesDto: UpdateCoffeesDto) {
    return this.coffeesService.update(id, updateCoffeesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
