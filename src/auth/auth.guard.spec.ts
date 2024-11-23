import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

describe('Guard', () => {
  let jwtService: JwtService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'TEST',
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    authGuard = new AuthGuard(jwtService);
    expect(authGuard).toBeDefined();
  });

  it('should handle not registered user', async () => {
    let notRegistered = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer ' +
              jwtService.sign({ id: null, type: 'kakao', value: '1234' }),
          },
        }),
      }),
    };

    expect(authGuard.canActivate(notRegistered as any)).rejects.toThrow();
  });

  it('should handle registered user', async () => {
    let registered = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer ' +
              jwtService.sign({ id: BigInt(1), type: 'kakao', value: '1234' }),
          },
        }),
      }),
    };

    expect(authGuard.canActivate(registered as any)).resolves.toBe(true);
  });
});
