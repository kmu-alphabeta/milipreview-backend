import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Oauth } from '../entities/oauth.entity';
import { User } from '../entities/user.entity';
import { MikroORM } from '@mikro-orm/postgresql';
import { LoginProvider } from './dtos/login.dto';
import { AuthRequest } from './auth.guard';

describe('AuthService', () => {
  let service: AuthService;
  let oauthData = [];
  let userData = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn((e) => e),
          },
        },
        {
          provide: getRepositoryToken(Oauth),
          useValue: {
            findOne: jest.fn(),
            insert: jest.fn((e) => oauthData.push(e)),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            insert: jest.fn((e) => {
              userData.push({ ...e, id: 1 });
              return 1;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login and register', async () => {
    const token = await service.login({
      type: LoginProvider.KAKAO,
      code: '1234',
    });
    expect(token).toEqual({
      token: {
        id: null,
        type: LoginProvider.KAKAO,
        value: '1234',
      },
    });

    let registerBody = {
      name: 'name_test',
      narasarang: 'narasarang_test',
      email: 'email_test',
      address: 'address_test',
      birth: 'birth_test',
      phone: 'phone_test',
      militaryServiceOffice: 'militaryServiceOffice_test',
      applicantRegionOffice: 'applicantRegionOffice_test',
    };
    const token2 = await service.register(
      {
        user: {
          id: null,
          type: LoginProvider.KAKAO,
          value: '1234',
        },
      } as AuthRequest,
      registerBody,
    );

    let expectOauthData = {
      type: LoginProvider.KAKAO,
      value: '1234',
    };
    expect(token2).toEqual({
      token: { ...expectOauthData, id: 1 },
    });
    expect(oauthData).toEqual([{ ...expectOauthData, user: 1 }]);
    expect(userData).toEqual([{ ...registerBody, id: 1 }]);
  });
});
