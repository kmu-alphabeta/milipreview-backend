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
  predictedCutoff!: number;

  @ApiProperty()
  @Property({
    type: 'real',
  })
  probability!: number;

  @ApiProperty()
  @Property({
    type: 'timestamptz',
  })
  timestamp!: Date;

  @ApiProperty({ description: '모집 단위 이름' })
  @Property({
    type: 'string',
  })
  category: string;

}
