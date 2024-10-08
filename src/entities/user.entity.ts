import {
  BigIntType,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Oauth } from './oauth.entity';
import { History } from './history.entity';
import { CommonForm } from './common-form.entity';

@Entity()
export class User {
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @Property({
    type: 'text',
  })
  name!: string;

  @Property({
    type: 'text',
  })
  narasarang!: string;

  @Property({
    type: 'text',
  })
  email!: string;

  @Property({
    type: 'text',
  })
  address!: string;

  @Property({
    type: 'text',
  })
  birth!: string;

  @Property({
    type: 'text',
  })
  phone!: string;

  @Property({
    type: 'text',
  })
  militaryServiceOffice!: string;

  @Property({
    type: 'text',
  })
  applicantRegionOffice!: string;

  @OneToMany(() => Oauth, (attr) => attr.user, { cascade: [Cascade.ALL] })
  oauths = new Collection<Oauth>(this);

  @OneToMany(() => History, (attr) => attr.user, { cascade: [Cascade.ALL] })
  histories = new Collection<History>(this);

  @OneToMany(() => CommonForm, (attr) => attr.user, { cascade: [Cascade.ALL] })
  commonForms = new Collection<CommonForm>(this);
}
