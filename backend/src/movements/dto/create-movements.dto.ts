// DTO's help us do things like making sure our POST request payload's have
// everything we require before running further code. DTO's will likely have
// similar properties to the entities but doesn't require auto-generated 
// properties such as "id"

export class CreateMovementsDto {
  readonly name: string;
  readonly muscles: string[];
  readonly difficulty: number;
  readonly equipment: string[];
}
