import { Body, Controller, Get, Param } from '@nestjs/common';
import { CommonFormService } from '../common-form/common-form.service';

@Controller('all-form')
export class AllFormController {
  constructor(private readonly commonFormService: CommonFormService) {}

  @Get(':userid')
  async findAllForm(
    @Param('userid') userid: string,
    @Body() additionalForm: any,
  ) {
    const commonForm = await this.commonFormService.findOne(BigInt(userid));

    return {
      commonForm: {
        commonForm,
      },
      additionalForm: {
        ...additionalForm,
      },
    };
  }
}