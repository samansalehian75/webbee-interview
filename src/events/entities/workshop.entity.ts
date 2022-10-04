import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  start: string;

  @Column({ type: 'datetime' })
  end: string;

  @Column({ type: 'integer', default: null })
  eventId: number;

  @Column()
  name: string;

  @Column({ type: 'datetime' })
  createdAt: string;

  @JoinColumn({ name: 'eventId' })
  @ManyToOne(() => Event, (entity) => entity.workshops)
  entity: Event;
}