import {
  BigIntType,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Oauth {
  constructor(userId: bigint, type: string, value: string) {
    this.user = new User(userId);
    this.type = type;
    this.value = value;
  }

  toJSON() {
    return instanceToPlain(this);
  }

  @ApiProperty()
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => User)
  user: User;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  type!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  value!: string;
}
