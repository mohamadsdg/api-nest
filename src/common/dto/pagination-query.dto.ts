import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) //type conversion
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number) //type conversion
  offset: number;
}
