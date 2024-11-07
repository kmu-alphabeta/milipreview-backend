import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFormService } from './additional-form.service';
import { MilitaryTypeEnum } from './enums/military.type.enum';

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
      expect(result).toBe('This action returns all types');
    });

    it('육군 모집단위 반환', () => {
      const result = service.findArmyTypes();
      expect(result).toBe('This action returns all army types');
    });

    it('해군 모집단위 반환', () => {
      const result = service.findNavyTypes();
      expect(result).toBe('This action returns all navy types');
    });

    it('공군 모집단위 반환', () => {
      const result = service.findAirForceTypes();
      expect(result).toBe('This action returns all air force types');
    });

    it('해병대 모집단위 반환', () => {
      const result = service.findMarinesTypes();
      expect(result).toBe('This action returns all marines types');
    });
  });

  describe('비정상 요청 - 존재하지 않는 enum 값으로 요청', () => {
    it('존재하지 않는 군종 반환 - 없는 군종', () => {
      const result = service.findAdditionalForm('test', 'test');
      expect(result).rejects.toThrow('This action returns all test test types');
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (육군)', () => {
      const result = service.findAdditionalForm(MilitaryTypeEnum.ARMY, 'test');
      expect(result).rejects.toThrow('This action returns all army test types');
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (해군)', () => {
      const result = service.findAdditionalForm(MilitaryTypeEnum.NAVY, 'test');
      expect(result).rejects.toThrow('This action returns all navy test types');
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (공군)', () => {
      const result = service.findAdditionalForm(
        MilitaryTypeEnum.AIR_FORCE,
        'test',
      );
      expect(result).rejects.toThrow(
        'This action returns all air-force test types',
      );
    });

    it('존재하지 않는 군종 반환 - 없는 모집단위 (해병대)', () => {
      const result = service.findAdditionalForm(
        MilitaryTypeEnum.MARINE_CORPS,
        'test',
      );
      expect(result).rejects.toThrow(
        'This action returns all marines test types',
      );
    });
  });
});