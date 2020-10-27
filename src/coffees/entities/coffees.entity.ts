import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class coffees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column({ nullable: true })
  // description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable({ name: 'coffees_flavors' })
  @ManyToMany(
    () => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors: Flavor[];

  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' })
  'updated_at': Date;
}
