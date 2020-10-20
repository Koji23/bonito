import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipment } from "./equipment.entity";

// an Entity represents a relationship between a typescript class and a database table
// By default the sql table generated will be the same as the class name but in lowercase
@Entity()
export class Movement {
  @PrimaryGeneratedColumn() // this will define id as the primary column and auto increment for us
  id: number;

  @Column()
  name: string;

  @Column('json', { nullable: true }) // tell typeorm to store arrays as the postgres json type and make the column nullable or optional in the table
  muscles: string[]; // TODO: make this a relation

  @Column()
  difficulty: number;

  @JoinTable() // This will create a new table movement_equipment_equipment which represents the movement-equipment many-to-many relationship. Movement is the owner of this many-to-many relatioship so it alone gets the JoinTable decorator.
  @ManyToMany(
    type => Equipment,
    equipment => equipment.movements,
    { cascade: true }, // this will allow for cascading inserts for both inserts and updates. Works together with MovementsService.preloadEquipmentByName
  )
  equipment: Equipment[];
}
