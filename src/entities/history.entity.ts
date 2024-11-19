import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class History {
  toJSON() {
    return instanceToPlain(this);
  }

  @ApiProperty()
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  score!: number;

  @ApiProperty()
  @Property({
    type: 'real',
  })
  predictedScore!: number;

  @ApiProperty()
  @Property({
    type: 'real',
  })
  predictedPercent!: number;
}
