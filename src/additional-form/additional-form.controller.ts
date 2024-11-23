import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';
import {
  ApiBearerAuth, ApiOperation, ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MilitaryTypeEnum } from './enums/military.type.enum';
import { AirForceTypeEnum } from './enums/air-force/air-force.type.enum';
import { ArmyTypeEnum } from './enums/army/army.type.enum';
import { NavyTypeEnum } from './enums/navy/navy.type.enum';
import { MarineCorpsTypeEnum } from './enums/marine-corps/marine-corps.type.enum';
import { AuthGuard } from '../auth/auth.guard';
import { CalculateBodyDto } from './dtos/calculate';
import { PredictionService } from '../prediction/prediction.service';
import { PredictionRequestDto } from '../prediction/dto/prediction-request.dto';

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
  constructor(
    private readonly additionalFormService: AdditionalFormService,
    private readonly predictionService: PredictionService,
  ) {}

  // 모집단위 종류 가져오기 (military.type.enum.ts 활용)
  @ApiOperation({ description: '군종 타입 가져오기; 앞으로의 요청에는 key 사용하면 됨.'})
  @ApiResponse({
    type: MilitaryTypeResponseDto,
    description: '군종 타입 리스트',
  })
  @Get()
  findTypes(): Record<string, string> {
    return this.additionalFormService.findTypes();
  }

  // 각 모집단위별 종류 가져오기 (육군, 해군, 공군, 해병대)
  @ApiOperation({ description: '군종별 세부 모집단위 가져오기; 앞으로의 요청에는 key 사용하면 됨.'})
  @ApiResponse({
    type:
      ArmyTypeResponseDto ||
      NavyTypeResponseDto ||
      AirForceTypeResponseDto ||
      MarineCorpsTypeResponseDto,
    description: '군종 타입(모집단위) 리스트',
  })
  @ApiParam({
    name: 'military',
    description: '군 종류 (예: ARMY, NAVY, AIR_FORCE, MARINE_CORPS)',
    example: 'ARMY',
  })
  @Get('/:military')
  findMilitaryTypes(
    @Param('military') military: string,
  ): Record<string, string> {
    return this.additionalFormService.findMilitaryTypes(military.toUpperCase());
  }

  // 군종별 + 모집단위별 추가 서식 가져오기
  @ApiOperation({ description: '모집단위별 입력서식 Json 가져오기.'})
  @ApiResponse({
    description: 'Json 형태의 추가 서식',
  })
  @ApiParam({
    name: 'military',
    description: '군 종류 (예: ARMY, NAVY, AIR_FORCE, MARINE_CORPS)',
    example: 'ARMY',
  })
  @ApiParam({
    name: 'subtype',
    description: '군 세부 모집단위 종류',
    example: 'GENERAL',
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

  @ApiOperation({ description: '점수 계산하기; 이후 자동으로 예측 및 히스토리 생성까지 진행됨'})
  @Post('/calculate')
  calculate(
  @Param('military') military: string,
  @Param('subtype') subtype: string,
  @Body() { form }: CalculateBodyDto,
  ) {

  const militaryTypes = this.additionalFormService.findTypes();

  const militaryType = military.toUpperCase();
  if (!militaryTypes[militaryType]) {
    throw new Error(`Invalid military type: ${militaryType}`);
  }

  const subtypes = this.additionalFormService.findMilitaryTypes(militaryType);

  const subtypeEnum = subtypes[subtype.toUpperCase()];
  if (!subtypeEnum) {
    throw new Error(
      `Invalid subtype for military type ${militaryType}: ${subtype}`,
    );
  }

  const finalScore = this.additionalFormService.calculate(form);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const category = `${militaryTypes[militaryType]}/${subtypeEnum}`;

  const predictionDto: PredictionRequestDto = {
    year,
    month,
    category,
    score: finalScore,
  };

  return this.predictionService.predict(predictionDto);
}
}
