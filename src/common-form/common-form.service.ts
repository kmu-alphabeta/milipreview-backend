import { Injectable } from '@nestjs/common';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { CommonForm } from '../entities/common-form.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';

@Injectable()
export class CommonFormService {
  constructor(
    @InjectRepository(CommonForm)
    private readonly commonFormRepository: EntityRepository<CommonForm>,
  ) {}

  async create(
    id: bigint,
    createCommonFormDto: CreateCommonFormDto,
  ): Promise<void> {
    await this.commonFormRepository.insert({
      ...createCommonFormDto,
      user: id,
    });
  }

  async findOne(id: bigint): Promise<CommonForm> {
    return await this.commonFormRepository.findOneOrFail({ id });
  }

  async findOneByUser(userId: bigint): Promise<CommonForm> {
    return await this.commonFormRepository.findOneOrFail({ user: userId });
  }

  async update(
    id: bigint,
    updateCommonFormDto: UpdateCommonFormDto,
  ): Promise<void> {
    await this.commonFormRepository.nativeUpdate(
      { user: id },
      updateCommonFormDto,
    );
  }

  async remove(id: bigint): Promise<void> {
    await this.commonFormRepository.nativeDelete({ user: id });
  }
}
