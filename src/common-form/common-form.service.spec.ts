import { Test, TestingModule } from '@nestjs/testing';
import { CommonFormService } from './common-form.service';
import { CommonForm } from '../entities/common-form.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

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
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new CommonForm()),
          },
        },
        {
          provide: EntityManager, // EntityManager 모킹
          useValue: {
            persistAndFlush: jest.fn().mockResolvedValue(undefined),
            removeAndFlush: jest.fn().mockResolvedValue(undefined),
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

  it('정의되어 있어야 한다', () => {
    // 'should be defined'
    expect(service).toBeDefined();
  });

  // CREATE
  it('새로운 공통 양식을 생성해야 한다', async () => {
    // 'should create a new common form'
    const userId = 1n;
    const commonForm = new CommonForm();
    await service.create(userId, commonForm);
    expect(entityManager.persistAndFlush).toHaveBeenCalledWith(commonForm);
  });

  // READ
  it('공통 양식 배열을 반환해야 한다', async () => {
    // 'should return an array of common forms'
    const commonForm1 = new CommonForm();
    const commonForm2 = new CommonForm();
    jest
      .spyOn(repository, 'findAll')
      .mockResolvedValueOnce([commonForm1, commonForm2]);

    const result = await service.findAll();
    expect(result).toEqual([commonForm1, commonForm2]);
  });

  // READ
  it('ID로 공통 양식을 반환해야 한다', async () => {
    // 'should return a common form by id'
    const commonForm = new CommonForm();
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(commonForm);

    const result = await service.findOne(1n);
    expect(result).toBe(commonForm);
  });

  // UPDATE
  it('특정 ID에 해당하는 공통 양식을 업데이트해야 한다', async () => {
    // 'should update a common form by id'
    const commonForm = new CommonForm();
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(commonForm);

    await service.update(1n, commonForm);
    expect(entityManager.persistAndFlush).toHaveBeenCalledWith(commonForm);
  });

  // DELETE
  it('공통 양식을 삭제해야 한다', async () => {
    // 'should remove a common form'
    const commonForm = new CommonForm();
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(commonForm); // findOne()이 commonForm을 반환하도록 설정

    await service.remove(1n);
    expect(entityManager.removeAndFlush).toHaveBeenCalledWith(commonForm);
  });

  // CREATE-ERROR
  it('이미 공통 양식을 생성한 사용자가 다시 생성하려 하면 오류를 발생시켜야 한다', async () => {
    // 'should throw an error if user has already created a common form'
    const commonForm = new CommonForm();
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(commonForm);

    await expect(service.create(1n, commonForm)).rejects.toThrow(
      'User has already created a CommonForm',
    );
  });

  // READ-ERROR
  it('공통 양식을 찾을 수 없으면 오류를 발생시켜야 한다', async () => {
    // 'should throw an error if common form not found'
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.findOne(999n)).rejects.toThrow('CommonForm not found');
  });

  // DELETE-ERROR
  it('존재하지 않는 공통 양식을 삭제하려 하면 오류를 발생시켜야 한다', async () => {
    // 'should throw an error if trying to remove a non-existent common form'
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.remove(999n)).rejects.toThrow('CommonForm not found');
  });
});
