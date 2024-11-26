import { HttpException, Injectable } from '@nestjs/common';
import { LoginProvider, LoginResponseDto } from './dtos/login.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Oauth } from '../entities/oauth.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { AuthInfo } from './auth.guard';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { KakaoResponse } from './interfaces/kakao';
import { LoginReturn } from './interfaces/login';

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

  private async kakaoLogin(code: string): Promise<LoginReturn> {
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
    let json = (await resp.json()) as KakaoResponse;
    let { id, kakao_account } = json;
    if (!id) {
      throw new HttpException('Unauthorized', 401);
    }

    let { profile } = kakao_account;
    return {
      type: LoginProvider.KAKAO,
      value: id.toString(),
      name: profile.nickname,
      email: kakao_account.email,
      img: profile.thumbnail_image_url,
    };
  }

  async login(type: LoginProvider, code: string): Promise<LoginResponseDto> {
    let loginReturn: LoginReturn;

    switch (type) {
      case LoginProvider.KAKAO:
        loginReturn = await this.kakaoLogin(code);
        break;
      default:
        throw new HttpException('Not Implemented Login Method', 501);
    }

    let oauth = await this.oauthRepository.findOne({
      type: loginReturn.type,
      value: loginReturn.value,
    });
    let id = oauth?.user.id;

    if (!id) {
      id = await this.userRepository.insert({
        name: loginReturn.name,
        email: loginReturn.email,
        img: loginReturn.img,
      });
      await this.oauthRepository.insert({
        user: id,
        type: loginReturn.type,
        value: loginReturn.value,
      });
    } else {
      await this.userRepository.nativeUpdate(
        { id },
        {
          name: loginReturn.name,
          email: loginReturn.email,
          img: loginReturn.img,
        },
      );
    }

    return {
      token: await this.generateToken({
        id,
        type: loginReturn.type,
        value: loginReturn.value,
      }),
    };
  }

  async me(user: AuthInfo): Promise<User> {
    return await this.userRepository.findOneOrFail(user.id);
  }
}
