import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommonFormService } from './common-form.service';
import { CreateCommonFormDto } from './dto/create-common-form.dto';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';

@Controller('common-form')
export class CommonFormController {
  constructor(private readonly commonFormService: CommonFormService) {}

  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createCommonFormDto: CreateCommonFormDto,
  ) {
    return await this.commonFormService.create(
      BigInt(+id),
      createCommonFormDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
