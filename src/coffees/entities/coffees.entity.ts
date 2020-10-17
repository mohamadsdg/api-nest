import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class coffees {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column('json', { nullable: true })
  flavor: Array<string>;
}
