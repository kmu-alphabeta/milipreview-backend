import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { AuthInfo } from '../auth/auth.guard';
import { User } from '../entities/user.entity';
import { UpdateInfoBodyDto } from './dtos/update.dto';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getMyInfo(auth: AuthInfo) {
    return await this.userRepository.findOne({ id: auth.id });
  }

  async updateMyInfo(auth: AuthInfo, info: UpdateInfoBodyDto) {
    await this.userRepository.nativeUpdate({ id: auth.id }, info);
  }
}
