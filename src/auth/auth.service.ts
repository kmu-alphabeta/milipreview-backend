import { HttpException, Injectable } from '@nestjs/common';
import { LoginProvider, LoginResponseDto } from './dtos/login.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Oauth } from '../entities/oauth.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { AuthInfo } from './auth.guard';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(Oauth)
    private readonly oauthRepository: EntityRepository<Oauth>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  private async generateToken(info: AuthInfo): Promise<string> {
    return await this.jwtService.signAsync(info);
  }

  private async kakaoLogin(code: string): Promise<string> {
    // get access token with oauth token
    let resp = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>('KAKAO_REST_API_KEY'),
        redirect_uri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
        code,
      }),
    });
    let { access_token } = await resp.json();
    if (!access_token) {
      throw new HttpException('Unauthorized', 401);
    }

    // get user id with access token;
    resp = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    let { id } = await resp.json();
    if (!id) {
      throw new HttpException('Unauthorized', 401);
    }

    return String(id);
  }

  async login(type: LoginProvider, code: string): Promise<LoginResponseDto> {
    let value: string;

    switch (type) {
      case LoginProvider.KAKAO:
        value = await this.kakaoLogin(code);
        break;
      default:
        throw new HttpException('Not Implemented Login Method', 501);
    }

    let oauth = await this.oauthRepository.findOne({ type, value });

    if (!oauth) {
      oauth = new Oauth(await this.userRepository.insert({}), type, value);
      await this.oauthRepository.insert(oauth);
    }

    return {
      token: await this.generateToken({
        id: oauth.user.id ?? null,
        type,
        value,
      }),
    };
  }
}
