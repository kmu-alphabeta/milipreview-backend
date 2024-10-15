import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFormController } from './additional-form.controller';
import { AdditionalFormService } from './additional-form.service';

describe('AdditionalFormController', () => {
  let controller: AdditionalFormController;
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
      const result = 'This action returns all types';
      jest.spyOn(service, 'findTypes').mockImplementation(() => result);

      expect(controller.findTypes()).toBe(result);
    });

    it('육군 모집단위를 반환해야 한다', () => {
      const result = 'This action returns all army types';
      jest.spyOn(service, 'findArmyTypes').mockImplementation(() => result);

      expect(controller.findArmyTypes()).toBe(result);
    });

    it('해군 모집단위를 반환해야 한다', () => {
      const result = 'This action returns all navy types';
      jest.spyOn(service, 'findNavyTypes').mockImplementation(() => result);

      expect(controller.findNavyTypes()).toBe(result);
    });

    it('공군 모집단위를 반환해야 한다', () => {
      const result = 'This action returns all air force types';
      jest.spyOn(service, 'findAirForceTypes').mockImplementation(() => result);

      expect(controller.findAirForceTypes()).toBe(result);
    });

    it('해병대 모집단위를 반환해야 한다', () => {
      const result = 'This action returns all marines types';
      jest.spyOn(service, 'findMarinesTypes').mockImplementation(() => result);

      expect(controller.findMarinesTypes()).toBe(result);
    });

    it('군종별 + 모집단위 요청에 해당하는 추가 서식을 반환해야 한다', () => {
      const result = 'This action returns all army infantry types';
      jest.spyOn(service, 'findMilitaryTypes').mockImplementation(() => result);

      expect(controller.findMilitaryTypes('army', 'infantry')).toBe(result);
    });
  });

  it('비정상 요청 - 없는 군종/모집단위를 요청하면 에러를 반환해야 한다', () => {
    const result = 'This action returns all test test types';
    jest.spyOn(service, 'findMilitaryTypes').mockImplementation(() => result);

    expect(controller.findMilitaryTypes('test', 'test')).rejects.toThrow(result);
  });
});