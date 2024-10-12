import { Injectable } from '@nestjs/common';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { CommonForm } from '../entities/common-form.entity';

@Injectable()
export class CommonFormService {
  async create(
    id: bigint,
    createCommonFormDto: CreateCommonFormDto,
  ): Promise<void> {
    // return 'This action adds a new commonForm';
  }

  async findAll(): Promise<CommonForm[]> {
    // return `This action returns all commonForm`;
    return [];
  }

  async findOne(id: bigint): Promise<CommonForm> {
    // return `This action returns a #${id} commonForm`;
    return new CommonForm();
  }

  async update(
    id: bigint,
    updateCommonFormDto: UpdateCommonFormDto,
  ): Promise<void> {
    // return `This action updates a #${id} commonForm`;
  }

  async remove(id: bigint): Promise<void> {
    // return `This action removes a #${id} commonForm`;
  }
}
