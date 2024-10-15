import { Test, TestingModule } from '@nestjs/testing';
import { AllFormController } from './all-form.controller';
import { CommonFormService } from '../common-form/common-form.service';
import { CommonForm } from '../entities/common-form.entity';

describe('AllFormController', () => {
  let controller: AllFormController;
  let commonFormService: CommonFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllFormController],
      providers: [CommonFormService],
    }).compile();

    controller = module.get<AllFormController>(AllFormController);
    commonFormService = module.get<CommonFormService>(CommonFormService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('정상 요청 - 공통 서식과 추가 서식을 한번에 반환해야 한다', async () => {
    const result = { certificates: 0 };
    const commonForm = new CommonForm();
    jest.spyOn(commonFormService, 'findOne').mockResolvedValueOnce(commonForm);

    const response = await controller.findAllForm('1', { certificates: 0 });
    expect(response).toBe({
      commonForm: {
        commonForm,
      },
      additionalForm: {
        result,
      },
    });
  });

  describe('비정상 요청', () => {
    it('유저가 작성한 공통 서식이 없을 때, 에러를 반환해야 한다', () => {
      const result = 'This action returns an error';
      jest.spyOn(commonFormService, 'findOne').mockRejectedValueOnce(result);

      expect(controller.findAllForm).rejects.toThrow(result);
    });
  });
});