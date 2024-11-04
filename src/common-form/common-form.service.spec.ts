import { Test, TestingModule } from '@nestjs/testing';
import { CommonFormService } from './common-form.service';
import { CommonForm } from '../entities/common-form.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';

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
  const commonForm = new CommonForm();
  Object.assign(commonForm, getCommonFormDto());
  commonForm.id = 1n;
  return commonForm;
}

describe('CommonFormService', () => {
  let service: CommonFormService;
  let userRepository: EntityRepository<User>;
  let commonFormRepository: EntityRepository<CommonForm>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFormService,
        {
          provide: getRepositoryToken(CommonForm),
          useValue: {
            findOne: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: MikroORM,
          useValue: {
            em: {
              persistAndFlush: jest.fn(),
              removeAndFlush: jest.fn(),
              nativeDelete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommonFormService>(CommonFormService);
    userRepository = module.get<EntityRepository<User>>(
      getRepositoryToken(User),
    );
    commonFormRepository = module.get<EntityRepository<CommonForm>>(
      getRepositoryToken(CommonForm),
    );
    entityManager = module.get<MikroORM>(MikroORM).em;
  });

  it('서비스가 정의되어 있어야 한다', () => {
    expect(service).toBeDefined();
  });

  describe('create 메서드', () => {
    it('사용자를 기반으로 새로운 공통 양식을 생성해야 한다', async () => {
      const userId = 1n;
      const commonFormDto = getCommonFormDto();
      const user = new User();
      user.id = userId;

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest
        .spyOn(entityManager, 'persistAndFlush')
        .mockResolvedValueOnce(undefined);

      await service.create(userId, commonFormDto);
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(
        expect.any(CommonForm),
      );
    });

    it('존재하지 않는 사용자는 NotFoundException을 발생시켜야 한다', async () => {
      const userId = 999n;
      const commonFormDto = getCommonFormDto();

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.create(userId, commonFormDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByUser 메서드', () => {
    it('사용자의 공통 양식을 반환해야 한다', async () => {
      const userId = 1n;
      const user = new User();
      user.id = userId;
      const commonForm = getCommonForm();

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest
        .spyOn(commonFormRepository, 'findOneOrFail')
        .mockResolvedValueOnce(commonForm);

      const result = await service.findOneByUser(userId);
      expect(result).toBe(commonForm);
      expect(commonFormRepository.findOneOrFail).toHaveBeenCalledWith({ user });
    });

    it('존재하지 않는 사용자는 NotFoundException을 발생시켜야 한다', async () => {
      const userId = 999n;

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOneByUser(userId)).rejects.toThrow(
        NotFoundException,
      );
      expect(commonFormRepository.findOneOrFail).not.toHaveBeenCalled();
    });
  });

  describe('update 메서드', () => {
    it('공통 양식을 업데이트해야 한다', async () => {
      const id = 1n;
      const updateFormDto = getCommonFormDto();
      const commonForm = getCommonForm();

      jest
        .spyOn(commonFormRepository, 'findOneOrFail')
        .mockResolvedValueOnce(commonForm);
      jest
        .spyOn(entityManager, 'persistAndFlush')
        .mockResolvedValueOnce(undefined);

      await service.update(id, updateFormDto);
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(commonForm);
    });

    it('존재하지 않는 공통 양식은 NotFoundException을 발생시켜야 한다', async () => {
      const id = 999n;
      const updateFormDto = getCommonFormDto();

      jest
        .spyOn(commonFormRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.update(id, updateFormDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove 메서드', () => {
    it('공통 양식을 삭제해야 한다', async () => {
      const id = 1n;
      const commonForm = getCommonForm();

      jest
        .spyOn(commonFormRepository, 'findOneOrFail')
        .mockResolvedValueOnce(commonForm);
      jest
        .spyOn(entityManager, 'removeAndFlush')
        .mockResolvedValueOnce(undefined);

      await service.remove(id);
      expect(entityManager.removeAndFlush).toHaveBeenCalledWith(commonForm);
    });

    it('존재하지 않는 공통 양식 삭제 시 NotFoundException을 발생시켜야 한다', async () => {
      const id = 999n;

      jest
        .spyOn(commonFormRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
