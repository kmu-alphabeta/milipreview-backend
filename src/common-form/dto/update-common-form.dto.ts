import { PartialType } from '@nestjs/mapped-types';
import { CreateCommonFormDto } from './create-common-form.dto';

export class UpdateCommonFormDto extends PartialType(CreateCommonFormDto) {}
