import { Test, TestingModule } from '@nestjs/testing';
import { CommonFormService } from './common-form.service';
import { CommonForm } from '../entities/common-form.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { UpdateCommonFormDto } from './dto/update-common-form.dto';
import { plainToClass } from 'class-transformer';

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

function getCommonForm(): CommonForm {
  const commonForm = plainToClass(CommonForm, getCommonFormDto());
  commonForm.id = 1n;
  return commonForm;
}

describe('CommonFormService', () => {
  let service: CommonFormService;
  let repository: EntityRepository<CommonForm>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFormService,
        {
          provide: getRepositoryToken(CommonForm),
          useValue: {
            findAll: jest.fn().mockResolvedValue([getCommonForm()]),
            findOne: jest.fn().mockResolvedValue(getCommonForm()),
          },
        },
        {
          provide: EntityManager, // EntityManager 모킹
          useValue: {
            persistAndFlush: jest.fn().mockResolvedValue(undefined),
            removeAndFlush: jest.fn().mockResolvedValue(undefined),
            findOne: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<CommonFormService>(CommonFormService);
    repository = module.get<EntityRepository<CommonForm>>(
      getRepositoryToken(CommonForm),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('서비스가 정의되어 있어야 한다', () => {
    // 'should be defined'
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('새로운 공통 양식을 생성해야 한다', async () => {
      // 'should create a new common form'
      const userId = 1n;
      const commonFormDto = getCommonFormDto();
      await service.create(userId, commonFormDto);
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(commonFormDto);
    });
  });

  describe('read', () => {
    it('공통 양식 배열을 반환해야 한다', async () => {
      // 'should return an array of common forms'
      const commonForm1 = getCommonForm();
      const commonForm2 = getCommonForm();
      commonForm2.id = 2n;
      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValueOnce([commonForm1, commonForm2]);

      const result = await service.findAll();
      expect(entityManager.findAll).toHaveBeenCalled();
      expect(result).toEqual([commonForm1, commonForm2]);
    });

    it('ID로 공통 양식을 반환해야 한다', async () => {
      // 'should return a common form by id'
      const commonForm = getCommonForm();
      jest.spyOn(entityManager, 'findOne').mockResolvedValueOnce(commonForm);

      const result = await service.findOne(1n);
      expect(entityManager.findOne).toHaveBeenCalledWith(CommonForm, {
        id: 1n,
      });
      expect(result).toBe(commonForm);
    });
  });

  // UPDATE
  describe('update', () => {
    it('특정 ID에 해당하는 공통 양식을 업데이트해야 한다', async () => {
      // 'should update a common form by id'
      const updateFormDto: UpdateCommonFormDto = { careerMonths: 24 };
      const commonForm = getCommonForm();
      commonForm.careerMonths = 24;

      jest.spyOn(entityManager, 'findOne').mockResolvedValueOnce(commonForm);
      jest
        .spyOn(entityManager, 'persistAndFlush')
        .mockResolvedValueOnce(undefined);

      await service.update(1n, updateFormDto);
      // ID로 엔티티가 조회되었는지 확인
      expect(entityManager.findOne).toHaveBeenCalledWith(CommonForm, {
        id: 1n,
      });

      // 엔티티가 업데이트된 후 저장되었는지 확인
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(commonForm);
    });
  });

  // DELETE - Idempotency
  describe('delete', () => {
    it('공통 양식을 삭제해야 한다', async () => {
      // 'should remove a common form'
      jest.spyOn(entityManager, 'nativeDelete').mockResolvedValueOnce(1); // 삭제 성공 시

      await service.remove(1n);
      expect(entityManager.nativeDelete).toHaveBeenCalledWith(CommonForm, {
        id: 1n,
      });
    });

    it('삭제할 공통 양식이 없어도 문제없이 작동해야 한다', async () => {
      // 'should remove a common form'
      jest.spyOn(entityManager, 'nativeDelete').mockResolvedValueOnce(0); // 삭제할 공통 양식이 없을 때

      await service.remove(10000n);
      expect(entityManager.nativeDelete).toHaveBeenCalledWith(CommonForm, {
        id: 10000n,
      });
    });
  });

  describe('create-exception', () => {
    it('이미 공통 양식을 생성한 사용자가 다시 생성하려 하면 오류를 발생시켜야 한다', async () => {
      // 'should throw an error if user has already created a common form'
      const commonForm = new CommonForm();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(commonForm);

      await expect(service.create(1n, commonForm)).rejects.toThrow(
        'User has already created a CommonForm',
      );
    });
  });

  describe('update-exception', () => {
    it('공통 양식을 찾을 수 없으면 오류를 발생시켜야 한다', async () => {
      // 'should throw an error if common form not found'
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(999n)).rejects.toThrow(
        'CommonForm not found',
      );
    });
  });

  describe('delete-exception', () => {
    it('존재하지 않는 공통 양식을 삭제하려 하면 오류를 발생시켜야 한다', async () => {
      // 'should throw an error if trying to remove a non-existent common form'
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.remove(999n)).rejects.toThrow(
        'CommonForm not found',
      );
    });
  });
});
