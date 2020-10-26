import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' })
  'updated_at': Date;
}
