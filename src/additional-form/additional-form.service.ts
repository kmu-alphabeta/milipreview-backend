import { Injectable } from '@nestjs/common';

@Injectable()
export class AdditionalFormService {
  // additional-form.controller.ts 의 코드 참고
  findTypes() {
    return `This action returns all types`;
  }

  findArmyTypes() {
    return `This action returns all army types`;
  }

  findNavyTypes() {
    return `This action returns all navy types`;
  }

  findAirForceTypes() {
    return `This action returns all air force types`;
  }

  findMarinesTypes() {
    return `This action returns all marines types`;
  }

  findMilitaryTypes(military: string, detail: string) {
    return `This action returns all ${military} ${detail} types`;
  }
}
