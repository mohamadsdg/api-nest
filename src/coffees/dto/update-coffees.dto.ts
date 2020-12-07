// export class UpdateCoffeesDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavor?: Array<string>;
// }

// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateCoffeesDto } from './create-coffees.dto';

export class UpdateCoffeesDto extends PartialType(CreateCoffeesDto) {}
