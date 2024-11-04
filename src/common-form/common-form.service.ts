import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { CommonForm } from '../entities/common-form.entity';
import { EntityRepository, MikroORM } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class CommonFormService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(CommonForm)
    private readonly commonFormRepository: EntityRepository<CommonForm>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly orm: MikroORM,
  ) {
    this.entityManager = this.orm.em;
  }

  async create(
    id: bigint,
    createCommonFormDto: CreateCommonFormDto,
  ): Promise<bigint> {
    // Find user with id
    const user = await this.findUser(id);

    // If exists, create commonForm with user and createCommonFormDto
    const commonForm = new CommonForm(user, createCommonFormDto);

    // save commonForm and return id
    await this.entityManager.persistAndFlush(commonForm);
    return commonForm.id;
  }

  async findOne(id: bigint): Promise<CommonForm> {
    return await this.commonFormRepository.findOneOrFail({ id });
  }

  async findOneByUser(userId: bigint): Promise<CommonForm> {
    const user = await this.findUser(userId);
    return this.commonFormRepository.findOneOrFail({ user });
  }

  async update(
    id: bigint,
    updateCommonFormDto: UpdateCommonFormDto,
  ): Promise<void> {
    const commonForm = await this.commonFormRepository.findOneOrFail({ id });
    commonForm.update(updateCommonFormDto);
    await this.entityManager.persistAndFlush(commonForm);
  }

  async remove(id: bigint): Promise<void> {
    const commonForm = await this.commonFormRepository.findOneOrFail({ id });
    await this.entityManager.removeAndFlush(commonForm);
  }

  private async findUser(id: bigint) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
