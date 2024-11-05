import { Test, TestingModule } from '@nestjs/testing';
import { CommonFormController } from './common-form.controller';
import { CommonFormService } from './common-form.service';
import { CommonForm } from '../entities/common-form.entity';
import { plainToClass } from "class-transformer";

function getCommonFormDto() {
  return {
    careerMonths: 12,
    hsAbsenceDays: 2,
    techCertificates: 3,
    majorDepartment: 1,
    volunteerScore: 10,
    bloodDonation: 5,
    nationalMerit: true,
    independenceMerit: false,
    corpExpScore: 80,
    indivExpScore: 75,
    multiChildScore: 5,
    careerApply: true,
    overseasApply: false,
    medicalApply: true,
    is_livelihood_recipient: false,
  };
}

describe('CommonFormController', () => {
  let controller: CommonFormController;
  let service: CommonFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonFormController],
      providers: [
        {
          provide: CommonFormService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new CommonForm()]),
            findOne: jest.fn().mockResolvedValue(new CommonForm()),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFormController>(CommonFormController);
    service = module.get<CommonFormService>(CommonFormService);
  });

  it('컨트롤러가 정의되어 있어야 한다', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('특정 ID에 해당하는 공통 서식을 반환해야 한다', async () => {
      const userId = '1'; // 사용자 ID
      const commonForm = new CommonForm();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(commonForm);

      const result = await controller.findOne(userId);
      expect(service.findOne).toHaveBeenCalledWith(BigInt(userId));
      expect(result).toBe(commonForm);
    });
  });

  describe('create', () => {
    it('새로운 공통 서식을 생성해야 한다', async () => {
      const userId = '1';
      const commonFormDto = getCommonFormDto();
      jest.spyOn(service, 'create').mockResolvedValueOnce(1n);

      const result = await controller.create(userId, commonFormDto);
      expect(service.create).toHaveBeenCalledWith(
        BigInt(userId),
        commonFormDto,
      );
      expect(result).toBe(1n);
    });
  });

  describe('update', () => {
    it('특정 ID에 해당하는 공통 서식을 업데이트해야 한다', async () => {
      const userId = '1';
      const updateDto = { careerMonths: 24 }; // 업데이트할 DTO

      const updatedForm = plainToClass(CommonForm, getCommonFormDto());
      updatedForm.careerMonths = 24;

      jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);
      await controller.update(userId, updateDto);
      expect(service.update).toHaveBeenCalledWith(BigInt(userId), updateDto);
    });
  });

  describe('remove', () => {
    it('특정 ID에 해당하는 공통 서식을 삭제해야 한다', async () => {
      const userId = '1';
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      await controller.remove(userId);
      expect(service.remove).toHaveBeenCalledWith(BigInt(userId));
    });
  });
});
