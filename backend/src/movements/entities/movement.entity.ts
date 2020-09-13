import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// an Entity represents a relationship between a typescript class and a database table
// By default the sql table generated will be the same as the class name but in lowercase
@Entity()
export class Movement {
  @PrimaryGeneratedColumn() // this will define id as the primary column and auto increment for us
  id: number;

  @Column()
  name: string;

  @Column('json', { nullable: true }) // tell typeorm to store arrays as the postgres json type and make the column nullable or optional in the table
  muscles: string[];

  @Column()
  difficulty: number;

  @Column('json', { nullable: true })
  equipment: string[];
}