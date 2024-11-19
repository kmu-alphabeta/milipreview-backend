import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommonFormService } from './common-form.service';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { CommonForm } from '../entities/common-form.entity';
import { AuthGuard, AuthRequest } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('common-form')
export class CommonFormController {
  constructor(private readonly commonFormService: CommonFormService) {}

  @ApiResponse({
    type: BigInt,
  })
  @Post()
  async create(
    @Request() { user }: AuthRequest,
    @Body() createCommonFormDto: CreateCommonFormDto,
  ): Promise<void> {
    await this.commonFormService.create(user.id, createCommonFormDto);
  }

  @ApiResponse({
    type: CommonForm,
  })
  @Get()
  async findOne(@Request() { user }: AuthRequest): Promise<CommonForm> {
    return await this.commonFormService.findOne(user.id);
  }

  @Patch()
  async update(
    @Request() { user }: AuthRequest,
    @Body() updateCommonFormDto: UpdateCommonFormDto,
  ) {
    return await this.commonFormService.update(user.id, updateCommonFormDto);
  }

  @Delete()
  async remove(@Request() { user }: AuthRequest) {
    return await this.commonFormService.remove(user.id);
  }
}
