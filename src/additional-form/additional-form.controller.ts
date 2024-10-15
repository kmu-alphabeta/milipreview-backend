import { Controller, Get, Param } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';

@Controller('additional-form')
export class AdditionalFormController {
  constructor(private readonly additionalFormService: AdditionalFormService) {}

  // 모집단위 종류 가져오기 (military.type.enum.ts 활용)
  @Get('types')
  findTypes() {
    return this.additionalFormService.findTypes();
  }

  // 각 모집단위별 종류 가져오기 (육군, 해군, 공군, 해병대)
  @Get('types/army')
  findArmyTypes() {
    return this.additionalFormService.findArmyTypes();
  }

  @Get('types/navy')
  findNavyTypes() {
    return this.additionalFormService.findNavyTypes();
  }

  @Get('types/air-force')
  findAirForceTypes() {
    return this.additionalFormService.findAirForceTypes();
  }

  @Get('types/marines')
  findMarinesTypes() {
    return this.additionalFormService.findMarinesTypes();
  }

  // 군종별 + 모집단위별 종류 가져오기
  @Get('types/:military/:subtype')
  findMilitaryTypes(
    @Param('military') military: string,
    @Param('subtype') subtype: string,
  ) {
    return this.additionalFormService.findMilitaryTypes(military, subtype);
  }
}
