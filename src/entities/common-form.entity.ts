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
import { Exclude, instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

  toJSON() {
    return instanceToPlain(this);
  }

  @ApiProperty()
  @PrimaryKey({
    type: new BigIntType('bigint'),
    autoincrement: true,
  })
  id!: bigint;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => User)
  user: User;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  careerMonths!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  hsAbsenceDays!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  techCertificates!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  majorDepartment!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  volunteerScore!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  bloodDonation!: number;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  nationalMerit!: boolean;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  independenceMerit!: boolean;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  corpExpScore!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  indivExpScore!: number;

  @ApiProperty()
  @Property({
    type: 'integer',
  })
  multiChildScore!: number;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  careerApply!: boolean;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  overseasApply!: boolean;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  medicalApply!: boolean;

  @ApiProperty()
  @Property({
    type: 'boolean',
  })
  is_livelihood_recipient!: boolean;
}
