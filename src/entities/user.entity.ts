import {
  BigIntType,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Oauth } from './oauth.entity';
import { History } from './history.entity';
import { CommonForm } from './common-form.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity()
export class User {
  toJSON() {
    return instanceToPlain(this);
  }

  @ApiProperty()
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  name!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  narasarang!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  email!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  address!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  birth!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  phone!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  militaryServiceOffice!: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  applicantRegionOffice!: string;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Oauth, (attr) => attr.user, { cascade: [Cascade.ALL] })
  oauths = new Collection<Oauth>(this);

  @Exclude({ toPlainOnly: true })
  @OneToMany(() => History, (attr) => attr.user, { cascade: [Cascade.ALL] })
  histories = new Collection<History>(this);

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => CommonForm, (attr) => attr.user, { cascade: [Cascade.ALL] })
  commonForms = new Collection<CommonForm>(this);
}
