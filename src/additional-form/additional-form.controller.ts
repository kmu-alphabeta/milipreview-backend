import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MilitaryTypeEnum } from './enums/military.type.enum';
import { AirForceTypeEnum } from './enums/air-force/air-force.type.enum';
import { ArmyTypeEnum } from './enums/army/army.type.enum';
import { NavyTypeEnum } from './enums/navy/navy.type.enum';
import { MarineCorpsTypeEnum } from './enums/marine-corps/marine-corps.type.enum';
import { AuthGuard } from 'src/auth/auth.guard';

export class MilitaryTypeResponseDto {
  @ApiProperty({ enum: MilitaryTypeEnum, description: '군종' })
  type: MilitaryTypeEnum;
}

export class AirForceTypeResponseDto {
  @ApiProperty({ enum: AirForceTypeEnum, description: '공군' })
  type: AirForceTypeEnum;
}

export class ArmyTypeResponseDto {
  @ApiProperty({ enum: ArmyTypeEnum, description: '육군' })
  type: ArmyTypeEnum;
}

export class NavyTypeResponseDto {
  @ApiProperty({ enum: NavyTypeEnum, description: '해군' })
  type: NavyTypeEnum;
}

export class MarineCorpsTypeResponseDto {
  @ApiProperty({ enum: MarineCorpsTypeEnum, description: '해병대' })
  type: MarineCorpsTypeEnum;
}

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('form')
@ApiTags('Form')
export class AdditionalFormController {
  constructor(private readonly additionalFormService: AdditionalFormService) {}

  // 모집단위 종류 가져오기 (military.type.enum.ts 활용)
  @ApiResponse({
    type: MilitaryTypeResponseDto,
    description: '군종 타입 리스트',
  })
  @Get()
  findTypes(): Record<string, string> {
    return this.additionalFormService.findTypes();
  }

  // 각 모집단위별 종류 가져오기 (육군, 해군, 공군, 해병대)
  @ApiResponse({
    type:
      ArmyTypeResponseDto ||
      NavyTypeResponseDto ||
      AirForceTypeResponseDto ||
      MarineCorpsTypeResponseDto,
    description: '군종 타입 리스트',
  })
  @Get('/:military')
  findMilitaryTypes(
    @Param('military') military: string,
  ): Record<string, string> {
    return this.additionalFormService.findMilitaryTypes(military.toUpperCase());
  }

  // 군종별 + 모집단위별 추가 서식 가져오기
  @ApiResponse({
    description: 'Json 형태의 추가 서식',
  })
  @Get('/:military/:subtype')
  findAdditionalForm(
    @Param('military') military: string,
    @Param('subtype') subtype: string,
  ) {
    return this.additionalFormService.findAdditionalForm(
      military.toUpperCase(),
      subtype.toUpperCase(),
    );
  }
}
