import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { coffees } from './coffees.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(
    () => coffees,
    coffee => coffee.flavors,
  )
  coffees: coffees[];
}
