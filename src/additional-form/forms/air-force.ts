import { AirForceTypeEnum } from '../enums/air-force/air-force.type.enum';
import { Form } from '../interface/form';

export const getAirForceForm = (detail: AirForceTypeEnum): Form => {
  return {
    militaryType: `공군/${detail}`,
    form: [
      {
        name: '자격증',
        type: 'radio',
        score: {
          ...(detail === AirForceTypeEnum.VEHICLE_DRIVING
            ? { '대형,특수': 50, '1종보통': 45, '2종보통(수동)': 40 }
            : {}),
          기사이상: detail === AirForceTypeEnum.GENERAL ? 70 : 50,
          산업기사: detail === AirForceTypeEnum.GENERAL ? 68 : 45,
          기능사: detail === AirForceTypeEnum.GENERAL ? 66 : 40,
          'L6,L5': detail === AirForceTypeEnum.GENERAL ? 70 : 50,
          'L4,L3': detail === AirForceTypeEnum.GENERAL ? 68 : 45,
          L2: detail === AirForceTypeEnum.GENERAL ? 66 : 40,
          공인자격증: detail === AirForceTypeEnum.GENERAL ? 64 : 30,
          일반자격증: detail === AirForceTypeEnum.GENERAL ? 62 : 26,
          자격증미소지: detail === AirForceTypeEnum.GENERAL ? 60 : 20,
        },
      },
      ...(detail === AirForceTypeEnum.GENERAL
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
          detail === AirForceTypeEnum.GENERAL
            ? {
                '0일': 20,
                '1~2일': 19,
                '3-4일': 18,
                '5~6일': 17,
                '7일이상': 16,
              }
            : {
                '0일': 10,
                '1~2일': 9,
                '3-4일': 8,
                '5~6일': 7,
                '7일이상': 6,
              },
      },
      {
        name: '유공자',
        type: 'yesno',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '질병치료',
        type: 'yesno',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '국외이주자',
        type: 'yesno',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '다자녀',
        type: 'radio',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          '3명이상': 4,
          '2명': 2,
          해당없음: 0,
        },
      },
      {
        name: '생계급여수급권자',
        type: 'yesno',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          yes: 4,
          no: 0,
        },
      },
      {
        name: '봉사활동',
        type: 'radio',
        group: [
          {
            name: '봉사/헌혈',
            priority: 1,
            limit: 8,
          },
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
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
        group: [
          {
            name: '봉사/헌혈',
            priority: 1,
            limit: 8,
          },
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
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
      ...(detail === AirForceTypeEnum.GENERAL
        ? [
            {
              name: '지정특기(방공포,군사경찰,조리) 가산점',
              type: 'yesno',
              group: [
                {
                  name: '가산점',
                  priority: 2,
                  limit: 15,
                },
              ],
              score: {
                yes: 4,
                no: 0,
              },
            },
          ]
        : []),
      ...(detail === AirForceTypeEnum.CBR
        ? [
            {
              name: '운전면허소지자 2종보통이상(오토제외)',
              type: 'yesno',
              group: [
                {
                  name: '가산점',
                  priority: 2,
                  limit: 15,
                },
              ],
              score: {
                yes: 4,
                no: 0,
              },
            },
          ]
        : []),
      ...(detail === AirForceTypeEnum.MECHANICAL
        ? [
            {
              name: '항공정비사/항공정비기초인력인증서',
              type: 'yesno',
              group: [
                {
                  name: '가산점',
                  priority: 2,
                  limit: 15,
                },
              ],
              score: {
                yes: 4,
                no: 0,
              },
            },
          ]
        : []),
      {
        name: '추천특기지원자',
        type: 'yesno',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          yes: 1,
          no: 0,
        },
      },
      {
        name: '한국사능력검정 (국가편찬위원회:4년, KBS: 2년)',
        type: 'radio',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          '1,2급': 2,
          '3,4급': 1,
          해당없음: 0,
        },
      },
      {
        name: '공인영어성적(2년)',
        type: 'radio',
        group: [
          {
            name: '가산점',
            priority: 2,
            limit: 15,
          },
        ],
        score: {
          'TOEIC 730점이상': 2,
          'TOEIC 520점이상': 1,
          'TOEFL 82점이상': 2,
          'TOEFL 59점이상': 1,
          'New TEPS 277이상': 2,
          'New TEPS 201이상': 1,
          해당없음: 0,
        },
      },
    ],
  };
};
