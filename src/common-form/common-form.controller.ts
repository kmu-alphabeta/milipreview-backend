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
  create(
    @Param('id') id: string,
    @Body() createCommonFormDto: CreateCommonFormDto,
  ) {
    return this.commonFormService.create(BigInt(+id), createCommonFormDto);
  }

  @Get()
  findAll() {
    return this.commonFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonFormService.findOne(BigInt(+id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommonFormDto: UpdateCommonFormDto,
  ) {
    return this.commonFormService.update(BigInt(+id), updateCommonFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonFormService.remove(BigInt(+id));
  }
}
