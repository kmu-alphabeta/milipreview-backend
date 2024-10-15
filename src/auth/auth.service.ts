import { HttpException, Injectable } from '@nestjs/common';
import { LoginQueryDto, LoginResponseDto } from './dtos/login.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Oauth } from '../entities/oauth.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { RegisterBodyDto, RegisterResponseDto } from './dtos/register.dto';
import { AuthInfo, AuthRequest } from './auth.guard';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Oauth)
    private readonly oauthRepository: EntityRepository<Oauth>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  private async generateToken(info: AuthInfo): Promise<string> {
    return await this.jwtService.signAsync(info);
  }

  async login(query: LoginQueryDto): Promise<LoginResponseDto> {
    if (query.error) {
      throw new HttpException(query, 400);
    }

    // TODO: validate code and get user oauth id (value)
    let value = query.code;

    let oauth = await this.oauthRepository.findOne({
      type: query.type,
      value,
    });

    return {
      token: await this.generateToken({
        id: oauth?.user.id ?? null,
        type: query.type,
        value,
      }),
    };
  }

  async register(
    req: AuthRequest,
    body: RegisterBodyDto,
  ): Promise<RegisterResponseDto> {
    // TODO: transaction
    let id = await this.userRepository.insert(body);
    await this.oauthRepository.insert({
      user: id,
      type: req.user.type,
      value: req.user.value,
    });
    return {
      token: await this.generateToken({
        id,
        type: req.user.type,
        value: req.user.value,
      }),
    };
  }
}
