import { Controller, Get, Param } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';

@Controller('additional-form')
export class AdditionalFormController {
  constructor(private readonly additionalFormService: AdditionalFormService) {}

  // 모집단위 종류 가져오기 (military.type.enum.ts 활용)
  @Get('types')
  findTypes(): Record<string, string> {
    return this.additionalFormService.findTypes();
  }

  // 각 모집단위별 종류 가져오기 (육군, 해군, 공군, 해병대)
  @Get('types/:military')
  findMilitaryTypes(
    @Param('military') military: string,
  ): Record<string, string> {
    return this.additionalFormService.findMilitaryTypes(military.toUpperCase());
  }

  // 군종별 + 모집단위별 추가 서식 가져오기
  @Get('types/:military/:subtype')
  findAdditionalForm(
    @Param('military') military: string,
    @Param('subtype') subtype: string,
  ) {
    return this.additionalFormService.findAdditionalForm(military.toUpperCase(), subtype.toUpperCase());
  }
}
