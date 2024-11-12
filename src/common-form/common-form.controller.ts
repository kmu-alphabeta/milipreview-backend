import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommonFormService } from './common-form.service';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CommonForm } from '../entities/common-form.entity';

@Controller('common-form')
export class CommonFormController {
  constructor(private readonly commonFormService: CommonFormService) {}

  @ApiResponse({
    type: BigInt,
  })
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createCommonFormDto: CreateCommonFormDto,
  ): Promise<bigint> {
    return await this.commonFormService.create(
      BigInt(+id),
      createCommonFormDto,
    );
  }

  @ApiResponse({
    type: CommonForm,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommonForm> {
    return await this.commonFormService.findOne(BigInt(+id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommonFormDto: UpdateCommonFormDto,
  ) {
    return await this.commonFormService.update(
      BigInt(+id),
      updateCommonFormDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commonFormService.remove(BigInt(+id));
  }
}
