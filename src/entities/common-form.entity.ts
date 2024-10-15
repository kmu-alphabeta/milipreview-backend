import {
  BigIntType,
  Entity,
  OneToOne,
  PrimaryKey,
  Property
} from "@mikro-orm/core";
import { User } from './user.entity';

@Entity()
export class CommonForm {
  @PrimaryKey({
    type: new BigIntType('bigint'),
  })
  id!: bigint;

  @OneToOne(() => User)
  user: User;

  @Property({
    type: 'integer',
  })
  careerMonths!: number;

  @Property({
    type: 'integer',
  })
  hsAbsenceDays!: number;

  @Property({
    type: 'integer',
  })
  techCertificates!: number;

  @Property({
    type: 'integer',
  })
  majorDepartment!: number;

  @Property({
    type: 'integer',
  })
  volunteerScore!: number;

  @Property({
    type: 'integer',
  })
  bloodDonation!: number;

  @Property({
    type: 'boolean',
  })
  nationalMerit!: boolean;

  @Property({
    type: 'boolean',
  })
  independenceMerit!: boolean;

  @Property({
    type: 'integer',
  })
  corpExpScore!: number;

  @Property({
    type: 'integer',
  })
  indivExpScore!: number;

  @Property({
    type: 'integer',
  })
  multiChildScore!: number;

  @Property({
    type: 'boolean',
  })
  careerApply!: boolean;

  @Property({
    type: 'boolean',
  })
  overseasApply!: boolean;

  @Property({
    type: 'boolean',
  })
  medicalApply!: boolean;
}
