import { Injectable } from '@nestjs/common';
import { MilitaryTypeEnum } from './enums/military.type.enum';
import { ArmyTypeEnum } from './enums/army/army.type.enum';
import { NavyTypeEnum } from './enums/navy/navy.type.enum';
import { AirForceTypeEnum } from './enums/air-force/air-force.type.enum';
import { MarineCorpsTypeEnum } from './enums/marine-corps/marine-corps.type.enum';
import { getArmyForm } from './forms/army';
import { getNavyForm } from './forms/navy';
import { getMarineCorpsForm } from './forms/marine-corps';
import { getAirForceForm } from './forms/air-force';
import { RequestFormDetail, RequestFormGroup } from './dtos/calculate';

@Injectable()
export class AdditionalFormService {
  findTypes(): Record<string, string> {
    return this.getEntriesToRecord(MilitaryTypeEnum);
  }

  findMilitaryTypes(military: string): Record<string, string> {
    switch (military as keyof typeof MilitaryTypeEnum) {
      case 'ARMY':
        return this.getEntriesToRecord(ArmyTypeEnum);
      case 'NAVY':
        return this.getEntriesToRecord(NavyTypeEnum);
      case 'AIR_FORCE':
        return this.getEntriesToRecord(AirForceTypeEnum);
      case 'MARINE_CORPS':
        return this.getEntriesToRecord(MarineCorpsTypeEnum);
      default:
        throw new Error('Invalid military type: ' + military);
    }
  }

  findAdditionalForm(military: string, detail: string) {
    switch (military as keyof typeof MilitaryTypeEnum) {
      case 'ARMY':
        return getArmyForm(ArmyTypeEnum[detail as keyof typeof ArmyTypeEnum]);
      case 'NAVY':
        return getNavyForm(NavyTypeEnum[detail as keyof typeof NavyTypeEnum]);
      case 'AIR_FORCE':
        return getAirForceForm(
          AirForceTypeEnum[detail as keyof typeof AirForceTypeEnum],
        );
      case 'MARINE_CORPS':
        return getMarineCorpsForm(
          MarineCorpsTypeEnum[detail as keyof typeof MarineCorpsTypeEnum],
        );
      default:
        throw new Error(`Invalid military type: ${military} ${detail}`);
    }
  }

  calculate(form: RequestFormDetail[]): number {
    let group: RequestFormGroup[] = [];
    let groupMap: Record<string, RequestFormDetail[]> = {};
    for (let f of form) {
      for (let g of f.group) {
        if (!groupMap[g.name]) {
          groupMap[g.name] = [];
          group.push(g);
        }
        groupMap[g.name].push(f);
      }
    }
    group.sort((a, b) => a.priority - b.priority);

    for (let g of group) {
      let remain = g.limit;
      for (let f of groupMap[g.name]) {
        if (f.score > remain) {
          f.score = remain;
          remain = 0;
        } else {
          remain -= f.score;
        }
      }
    }

    let final = 0;
    for (let f of form) {
      final += f.score;
    }

    return final;
  }

  private getEntriesToRecord(o: any) {
    return Object.entries(o).reduce(
      (acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
