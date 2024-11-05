import { MarineCorpsTypeEnum } from '../enums/marine-corps/marine-corps.type.enum';

export const getMarineCorpsForm = (detail: MarineCorpsTypeEnum) => {
  return {
    militaryType: `해병대/${detail === MarineCorpsTypeEnum.GENERAL || detail === MarineCorpsTypeEnum.SEARCH ? '일반' : '전문'}`,
    form: [
      {
        name: '자격증',
        type: 'radio',
        score: {
          ...(detail === MarineCorpsTypeEnum.TRANSPORTATION
            ? { '대형,특수': 50, '1종보통': 45 }
            : {}),
          기사이상:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 70
              : 50,
          산업기사:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 68
              : 45,
          기능사:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 66
              : 40,
          'L6,L5':
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 70
              : 50,
          'L4,L3':
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 68
              : 45,
          L2:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 66
              : 40,
          공인자격증:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 64
              : 30,
          일반자격증:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 62
              : 26,
          자격증미소지:
            detail === MarineCorpsTypeEnum.GENERAL ||
            detail === MarineCorpsTypeEnum.SEARCH
              ? 60
              : 20,
        },
      },
      ...(detail === MarineCorpsTypeEnum.GENERAL ||
      detail === MarineCorpsTypeEnum.SEARCH
        ? []
        : [
            {
              name: '전공학과',
              type: 'radio',
              score: {
                '대학교/4학년-수료이상': 40,
                '대학교/4학년-재학': 38,
                '대학교/3학년-수료': 36,
                '대학교/3학년-재학': 34,
                '대학교/2학년-수료': 32,
                '대학교/2학년-재학': 30,
                '대학교/1학년-수료': 28,
                '대학교/1학년-재학': 26,
                '전문대/3학년-수료': 40,
                '전문대/3학년-재학': 38,
                '전문대/2학년-수료': 36,
                '전문대/2학년-재학': 34,
                '전문대/1학년-수료': 32,
                '전문대/1학년-재학': 28,
                '비전공/고퇴이하': 20,
                '고졸-전공': 34,
                '고졸-비전공': 20,
                '한국폴리텍대학인력개발원-2년이상': 32,
                '한국폴리텍대학인력개발원-1년이상': 30,
                '한국폴리텍대학인력개발원-6월이상': 26,
                '학점은행제/40학점이상-학사': 28,
                '학점은행제/40학점이상-전문학사': 32,
                '학점은행제/80학점이상-학사': 32,
                '학점은행제/80학점이상-전문학사': 36,
                '학점은행제/120학점이상-학사': 36,
                '학점은행제/120학점이상-전문학사': 40,
                '학점은행제/140학점이상-학사': 40,
              },
            },
          ]),
      {
        name: '출결',
        type: 'radio',
        score:
          detail === MarineCorpsTypeEnum.GENERAL ||
          detail === MarineCorpsTypeEnum.SEARCH
            ? {
                '0일': 20,
                '1~2일': 18,
                '3-4일': 16,
                '5~6일': 14,
                '7~8일': 12,
                '8일이상': 10,
              }
            : {
                '0일': 10,
                '1~2일': 8,
                '3-4일': 6,
                '5~6일': 4,
                '7~8일': 2,
                '9일이상': 1,
              },
      },
      {
        name: '질병치료',
        type: 'yesno',
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '유공자',
        type: 'yesno',
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '국외이주자',
        type: 'yesno',
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '다자녀',
        type: 'radio',
        score: {
          '3명이상': 4,
          '2명': 2,
          해당없음: 0,
        },
      },
      {
        name: '생계급여수급권자',
        type: 'yesno',
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '봉사활동',
        type: 'radio',
        score: {
          '64시간이상': 8,
          '56시간이상': 7,
          '48시간이상': 6,
          '40시간이상': 5,
          '32시간이상': 4,
          '24시간이상': 3,
          '16시간이상': 2,
          '8시간이상': 1,
          '8시간미만': 0,
        },
      },
      {
        name: '헌혈',
        type: 'radio',
        score: {
          '8회이상': 8,
          '7회': 7,
          '6회': 6,
          '5회': 5,
          '4회': 4,
          '3회': 3,
          '2회': 2,
          '1회': 1,
          해당없음: 0,
        },
      },
      ...(detail !== MarineCorpsTypeEnum.SEARCH
        ? [
            {
              name: '무도유단자',
              type: 'radio',
              score: {
                '3단이상': 5,
                '1단이상': 2,
                해당없음: 0,
              },
            },
            {
              name: '수상인명구조자격증',
              type: 'yesno',
              score: {
                yes: 2,
                no: 0,
              },
            },
          ]
        : [
            {
              name: '스키강사자격증',
              type: 'yesno',
              score: {
                yes: 10,
                no: 0,
              },
            },
            {
              name: '스킨스쿠버자격증',
              type: 'yesno',
              score: {
                yes: 10,
                no: 0,
              },
            },
            {
              name: '수영강사자격증',
              type: 'yesno',
              score: {
                yes: 10,
                no: 0,
              },
            },
            {
              name: '무도유단자',
              type: 'radio',
              score: {
                '3단이상': 5,
                '1단이상': 2,
                해당없음: 0,
              },
            },
            {
              name: '수상인명구조자격증',
              type: 'yesno',
              score: {
                yes: 5,
                no: 0,
              },
            },
          ]),
      {
        name: '추천특기지원자',
        type: 'yesno',
        score: {
          yes: 1,
          no: 0,
        },
      },
    ],
  };
};
