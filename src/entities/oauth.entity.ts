import {
  BigIntType,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Oauth {
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @OneToOne(() => User)
  user: User;

  @Property({
    type: 'text',
  })
  type!: string;

  @Property({
    type: 'text',
  })
  value!: string;
}
