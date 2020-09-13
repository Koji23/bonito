import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./movement.entity";

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => Movement,
    movement => movement.equipment
  )
  movements: Movement[];
}
