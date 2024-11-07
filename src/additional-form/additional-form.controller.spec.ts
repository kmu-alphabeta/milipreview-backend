import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFormController } from './additional-form.controller';
import { AdditionalFormService } from './additional-form.service';
import { MilitaryTypeEnum } from './enums/military.type.enum';
import { MarineCorpsTypeEnum } from './enums/marine-corps/marine-corps.type.enum';
import { NavyTypeEnum } from './enums/navy/navy.type.enum';
import { AirForceTypeEnum } from './enums/air-force/air-force.type.enum';
import { ArmyTypeEnum } from './enums/army/army.type.enum';

describe('AdditionalFormController', () => {
  let controller: AdditionalFormController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: AdditionalFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalFormController],
      providers: [AdditionalFormService],
    }).compile();

    controller = module.get<AdditionalFormController>(AdditionalFormController);
    service = module.get<AdditionalFormService>(AdditionalFormService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('정상 요청', () => {
    it('군종 종류를 모두 반환해야 한다', () => {
      const result = {
        ARMY: '육군',
        NAVY: '해군',
        AIR_FORCE: '공군',
        MARINE_CORPS: '해병대',
      };
      expect(controller.findTypes()).toStrictEqual(result);
    });

    it('육군 모집단위를 반환해야 한다', () => {
      const result = {
        GENERAL: '일반',
        K_SERIES_TANK_UNIT_MAINTENANCE: 'K계열전차부대정비',
        K239_ARTILLERY: 'K239포병',
        SHOOTING_COMMAND: '사격지휘',
        MILITARY_INFORMATION: '군사정보',
        SIGNAL_INFORMATION_ELECTRONIC_CLOUD_OPERATION: '신호정보/전자전운용',
        SURVEILLANCE_EQUIPMENT_OPERATION: '감시장비운용',
        FIELD_CONSTRUCTION: '야전건설',
        ELECTRICAL_FACILITIES: '전기설비',
        AIR_COMPRESSOR_OPERATION: '공기압축기운용',
        CRANE_OPERATION: '크레인운용',
        GENERATOR_OPERATION_MAINTENANCE: '발전기운용/정비',
        FIELD_COMMUNICATION_EQUIPMENT_OPERATION_MAINTENANCE:
          '전술통신장비운용/정비',
        WIRELESS_TRANSMISSION_EQUIPMENT_OPERATION_MAINTENANCE:
          '무선전송장비운용/정비',
        EXCHANGE_FACILITY_OPERATION_MAINTENANCE: '교환시설운용/정비',
        MW_OPERATION_MAINTENANCE: 'MW운용/정비',
        SATELLITE_OPERATION_MAINTENANCE: '위성운용/정비',
        RADAR_OPERATION_MAINTENANCE: '레이다운용/정비',
        NETWORK_OPERATION_MAINTENANCE: '네트워크운용/정비',
        INFORMATION_SYSTEM_OPERATION_MAINTENANCE: '정보체계운용/정비',
        CBR_DECONTAMINATION: '화생방제독',
        AMMUNITION_MANAGEMENT: '탄약관리',
        EQUIPMENT_REPAIR_ACCESSORY_TOOL_SUPPLY: '장비수리부속공구보급',
        ORGANIZATION_SUPPLY: '편성보급',
        SUPPORT_SUPPLY: '지원보급',
        COOK: '조리',
        TRANSPORTATION_OPERATION_VEHICLE_DRIVING: '수송운용(차량운전)',
        VEHICLE_MAINTENANCE: '차량부대정비',
        GENERAL_MEDICAL: '일반의무',
        SPECIALIZED_NURSING: '전문간호',
        SPECIALIZED_DENTAL: '전문치과',
        SPECIALIZED_PHARMACEUTICAL: '전문약제',
        SPECIALIZED_PHYSICAL_THERAPY: '전문물리치료',
      };
      expect(controller.findMilitaryTypes('army')).toStrictEqual(result);
    });

    it('해군 모집단위를 반환해야 한다', () => {
      const result = {
        GENERAL: '일반',
        COMPUTER: '전산',
        COOK: '조리',
        AVIATION: '항공',
        ELECTRONIC: '전자',
        COMMUNICATION: '통신',
        MECHANICAL: '기관',
        CBR: '화생방',
        ELECTRICAL: '전기',
        ARCHITECTURE_CIVIL_ENGINEERING: '건축토목',
        TRANSPORTATION: '수송',
        MEDICAL: '의무',
      };
      expect(controller.findMilitaryTypes('navy')).toStrictEqual(result);
    });

    it('공군 모집단위를 반환해야 한다', () => {
      const result = {
        GENERAL: '일반',
        ELECTRONIC_COMPUTER: '전자계산',
        CBR: '화생방',
        MEDICAL: '의무',
        MECHANICAL: '기계',
        VEHICLE_DRIVING: '차량운전',
        VEHICLE_MAINTENANCE: '차량정비',
        COMMUNICATION_ELECTRONIC_ELECTRICAL: '통신전자전기',
      };
      expect(controller.findMilitaryTypes('air_force')).toStrictEqual(result);
    });

    it('해병대 모집단위를 반환해야 한다', () => {
      const result = {
        GENERAL: '일반',
        SEARCH: '수색',
        CHEMICAL: '화학',
        COMBAT_ENGINEER: '공병',
        WEAPON_MAINTENANCE: '무기정비',
        TRANSPORTATION: '수송',
      };
      expect(controller.findMilitaryTypes('marine_corps')).toStrictEqual(result);
    });

    it('군종별 + 모집단위 요청에 해당하는 추가 서식을 반환해야 한다', () => {
      for (const military in MilitaryTypeEnum) {
        const subtypes = (military: string) => {
          switch (military) {
            case 'ARMY':
              return ArmyTypeEnum;
            case 'NAVY':
              return NavyTypeEnum;
            case 'AIR_FORCE':
              return AirForceTypeEnum;
            case 'MARINE_CORPS':
              return MarineCorpsTypeEnum;
          }
        };
        for (const subtype in subtypes(military)) {
          const result = controller.findAdditionalForm(military, subtype);
          expect(result).toBeDefined(); // Adjust to match your expected result
        }
      }
    });
  });

  it('비정상 요청 - 없는 군종/모집단위를 요청하면 에러를 반환해야 한다', () => {
    try {
      controller.findAdditionalForm('TEST', 'TEST');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid military type: TEST TEST');
    }
  });
});
