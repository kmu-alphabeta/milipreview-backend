import {
  BigIntType,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { CreateCommonFormDto } from '../common-form/dto/create-common-form.dto';
import { UpdateCommonFormDto } from '../common-form/dto/update-common-form.dto';

@Entity()
export class CommonForm {
  constructor();
  constructor(user: User, createCommonFormDto: CreateCommonFormDto);

  constructor(user?: User, createCommonFormDto?: CreateCommonFormDto) {
    if (!user || !createCommonFormDto) {
      return;
    }

    this.user = user;
    this.careerMonths = createCommonFormDto.careerMonths;
    this.hsAbsenceDays = createCommonFormDto.hsAbsenceDays;
    this.techCertificates = createCommonFormDto.techCertificates;
    this.majorDepartment = createCommonFormDto.majorDepartment;
    this.volunteerScore = createCommonFormDto.volunteerScore;
    this.bloodDonation = createCommonFormDto.bloodDonation;
    this.nationalMerit = createCommonFormDto.nationalMerit;
    this.independenceMerit = createCommonFormDto.independenceMerit;
    this.corpExpScore = createCommonFormDto.corpExpScore;
    this.indivExpScore = createCommonFormDto.indivExpScore;
    this.multiChildScore = createCommonFormDto.multiChildScore;
    this.careerApply = createCommonFormDto.careerApply;
    this.overseasApply = createCommonFormDto.overseasApply;
    this.medicalApply = createCommonFormDto.medicalApply;
    this.is_livelihood_recipient = createCommonFormDto.is_livelihood_recipient;
  }

  update(updateCommonFormDto: UpdateCommonFormDto) {
    Object.entries(updateCommonFormDto).forEach(([key, value]) => {
      if (value !== undefined) {
        this[key] = value;
      }
    });
  }

  @PrimaryKey({
    type: new BigIntType('bigint'),
    autoincrement: true,
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

  @Property({
    type: 'boolean',
  })
  is_livelihood_recipient!: boolean;
}
