import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @ManyToOne(() => User)
  user: User;

  @Property({
    type: 'integer',
  })
  score!: number;

  @Property({
    type: 'real',
  })
  predictedScore!: number;

  @Property({
    type: 'real',
  })
  predictedPercent!: number;
}
