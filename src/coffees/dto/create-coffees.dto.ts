import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateCoffeesDto {
  @ApiProperty({description:'The name of coffee. '})
  @IsString()
  readonly name: string;

  @ApiProperty({description:'The name of brand coffee. '})
  @IsString()
  readonly brand: string;

  @ApiProperty({description:'list of flavor  ',default:[]})
  @IsString({ each: true })
  readonly flavor: Array<string>;
}
