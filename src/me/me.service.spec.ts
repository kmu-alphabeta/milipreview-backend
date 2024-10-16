import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from './me.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { LoginProvider } from '../auth/dtos/login.dto';
import { Collection } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { Oauth } from '../entities/oauth.entity';
import { History } from '../entities/history.entity';
import { CommonForm } from '../entities/common-form.entity';
import { find } from 'rxjs';

describe('MeService', () => {
  let service: MeService;
  let authInfo = {
    id: BigInt(1),
    type: LoginProvider.KAKAO,
    value: '1234',
  };
  let myInfo = {
    id: BigInt(1),
    name: 'name',
    narasarang: 'narasarang@narasarang.com',
    email: 'email@email.com',
    address: 'address',
    birth: '2000-01-01',
    phone: '010-1234-5678',
    militaryServiceOffice: 'militaryServiceOffice',
    applicantRegionOffice: 'applicantRegionOffice',
    oauths: new Collection<Oauth, object>([]),
    histories: new Collection<History, object>([]),
    commonForms: new Collection<CommonForm, object>([]),
  };
  let userData: User[] = [{ ...myInfo }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn((e) => {
              return userData.find((user) => user.id === e.id);
            }),
            nativeUpdate: jest.fn((target, value) => {
              let user = userData.find((user) => user.id === target?.id);
              if (!user) {
                throw new Error("User doesn't exist");
              }
              for (let i in value) {
                user[i] = value[i];
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return my info', async () => {
    let info = await service.getMyInfo(authInfo);
    expect(info).toEqual(myInfo);
  });

  it('should update my info', async () => {
    await service.updateMyInfo(authInfo, {
      address: 'Korea',
    });
    let info = await service.getMyInfo(authInfo);
    expect(info).toEqual({ ...myInfo, address: 'Korea' });
  });
});
