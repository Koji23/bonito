import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementsDto } from './create-movements.dto';

// simply returns the type of the class passed into PartialType with all the properties set to optional
// PartialType will inherit all the validation rules applied by the class-validator decoprators but
// also applies the @IsOptional decorator to each property as well.
export class UpdateMovementsDto extends PartialType(CreateMovementsDto) {
}
