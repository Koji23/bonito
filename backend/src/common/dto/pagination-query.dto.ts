import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';


export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // Ensure the value is parsed as a number, important since these are coming from query params
  // alternatively use implicit type conversion globally in ValidationPipe and comment these out
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number) 
  offset: number;
}
