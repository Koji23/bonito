import { IsString, IsNumber } from 'class-validator';

// DTO's help us do things like making sure our POST request payload's have
// everything we require before running further code. DTO's will likely have
// similar properties to the entities but doesn't require auto-generated 
// properties such as "id"

export class CreateMovementsDto {

  @IsString()
  readonly name: string;

  @IsString({ each: true }) // indicates that the expected value is an array of strings
  readonly muscles: string[];

  @IsNumber()
  readonly difficulty: number;

  @IsString({ each: true })
  readonly equipment: string[];
}
