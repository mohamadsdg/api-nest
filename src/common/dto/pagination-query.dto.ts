import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from "@nestjs/swagger";
export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) //type conversion
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  //@Type(() => Number) //type conversion
  offset: number;
}
