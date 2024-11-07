import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFormService } from './additional-form.service';

describe('AdditionalFormService', () => {
  let service: AdditionalFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalFormService],
    }).compile();

    service = module.get<AdditionalFormService>(AdditionalFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 특정 모집단위가 들어오면 해당 모집단위에 해당하는 추가서식을 반환해야 한다.
  describe('정상 요청', () => {
    it('존재하는 모든 군종 반환', () => {
      const result = service.findTypes();
      expect(result).toStrictEqual({
        ARMY: '육군',
        NAVY: '해군',
        AIR_FORCE: '공군',
        MARINE_CORPS: '해병대',
      });
    });

    it('육군 모집단위 반환', () => {
      const result = service.findMilitaryTypes('ARMY');
      expect(result).toStrictEqual({
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
      })
    });

    it('해군 모집단위 반환', () => {
      const result = service.findMilitaryTypes('NAVY');
      expect(result).toStrictEqual({
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
      })
    });

    it('공군 모집단위 반환', () => {
      const result = service.findMilitaryTypes('AIR_FORCE');
      expect(result).toStrictEqual({
        GENERAL: '일반',
        ELECTRONIC_COMPUTER: '전자계산',
        CBR: '화생방',
        MEDICAL: '의무',
        MECHANICAL: '기계',
        VEHICLE_DRIVING: '차량운전',
        VEHICLE_MAINTENANCE: '차량정비',
        COMMUNICATION_ELECTRONIC_ELECTRICAL: '통신전자전기',
      })
    });

    it('해병대 모집단위 반환', () => {
      const result = service.findMilitaryTypes('MARINE_CORPS');
      expect(result).toStrictEqual({
        GENERAL: '일반',
        SEARCH: '수색',
        CHEMICAL: '화학',
        COMBAT_ENGINEER: '공병',
        WEAPON_MAINTENANCE: '무기정비',
        TRANSPORTATION: '수송',
      })
    });
  });

  describe('비정상 요청 - 존재하지 않는 enum 값으로 요청', () => {
    it('존재하지 않는 군종 반환 - 없는 군종', () => {
      try {
        service.findAdditionalForm('TEST', 'TEST');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid military type: TEST TEST');
      }
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (육군)', () => {
      try {
        service.findAdditionalForm('ARMY', 'TEST');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid military type: ARMY TEST');
      }
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (해군)', () => {
      try {
        service.findAdditionalForm('NAVY', 'TEST');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid military type: NAVY TEST');
      }
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (공군)', () => {
      try {
        service.findAdditionalForm('AIR_FORCE', 'TEST');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid military type: AIR_FORCE TEST');
      }
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (해병대)', () => {
      try {
        service.findAdditionalForm('MARINE_CORPS', 'TEST');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid military type: MARINE_CORPS TEST');
      }
    });
  });
});