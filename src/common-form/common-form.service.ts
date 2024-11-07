import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { CommonForm } from '../entities/common-form.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';

@Injectable()
export class CommonFormService {
  constructor(
    @InjectRepository(CommonForm)
    private readonly commonFormRepository: EntityRepository<CommonForm>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager, // EntityManager 주입
  ) {}

  async create(
    id: bigint,
    createCommonFormDto: CreateCommonFormDto,
  ): Promise<bigint> {
    return await this.em.transactional(async em => {
      const user = await this.findUser(id);
      const commonForm = new CommonForm(user, createCommonFormDto);
      await em.persistAndFlush(commonForm);
      return commonForm.id;
    });
  }

  async findOne(id: bigint): Promise<CommonForm> {
    return await this.em.transactional(async em => {
      return await em.findOneOrFail(CommonForm, { id });
    }, { readOnly: true });
  }

  async findOneByUser(userId: bigint): Promise<CommonForm> {
    return await this.em.transactional(async em => {
      const user = await this.findUser(userId);
      return em.findOneOrFail(CommonForm, { user });
    }, { readOnly: true });
  }

  async update(
    id: bigint,
    updateCommonFormDto: UpdateCommonFormDto,
  ): Promise<void> {
    await this.em.transactional(async em => {
      const commonForm = await em.findOneOrFail(CommonForm, { id });
      commonForm.update(updateCommonFormDto);
      await em.persistAndFlush(commonForm);
    });
  }

  async remove(id: bigint): Promise<void> {
    await this.em.transactional(async em => {
      const commonForm = await em.findOneOrFail(CommonForm, { id });
      await em.removeAndFlush(commonForm);
    });
  }

  private async findUser(id: bigint) {
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}