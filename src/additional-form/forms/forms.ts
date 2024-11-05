import { AirForceTypeEnum } from '../enums/air-force/air-force.type.enum';
import { ArmyTypeEnum } from '../enums/army/army.type.enum';
import { MarineCorpsTypeEnum } from '../enums/marine-corps/marine-corps.type.enum';
import { MilitaryTypeEnum } from '../enums/military.type.enum';
import { NavyTypeEnum } from '../enums/navy/navy.type.enum';
import { getAirForceForm } from './air-force';
import { getArmyForm } from './army';
import { getMarineCorpsForm } from './marine-corps';
import { getNavyForm } from './navy';

const isValidEnum = <T>(enumType: T, value: any): value is T[keyof T] => {
  return Object.values(enumType).includes(value);
};

export const getForm = (
  militaryType: MilitaryTypeEnum,
  detail: AirForceTypeEnum | ArmyTypeEnum | MarineCorpsTypeEnum | NavyTypeEnum,
) => {
  switch (militaryType) {
    case MilitaryTypeEnum.ARMY:
      if (isValidEnum(ArmyTypeEnum, detail)) {
        return getArmyForm(detail);
      }
      break;
    case MilitaryTypeEnum.AIR_FORCE:
      if (isValidEnum(AirForceTypeEnum, detail)) {
        return getAirForceForm(detail);
      }
      break;
    case MilitaryTypeEnum.MARINE_CORPS:
      if (isValidEnum(MarineCorpsTypeEnum, detail)) {
        return getMarineCorpsForm(detail);
      }
      break;
    case MilitaryTypeEnum.NAVY:
      if (isValidEnum(NavyTypeEnum, detail)) {
        return getNavyForm(detail);
      }
  }
  throw new Error('Invalid militaryType or detail');
};
