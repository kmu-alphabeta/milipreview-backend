import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { MeService } from './me.service';
import { UpdateInfoBodyDto } from './dtos/update.dto';
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { User } from '../entities/user.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get()
  async getMyInfo(@Request() { user }: AuthRequest) {
    return await this.meService.getMyInfo(user);
  }

  @Patch()
  async updateMyInfo(
    @Request() { user }: AuthRequest,
    @Body() body: UpdateInfoBodyDto,
  ) {
    return await this.meService.updateMyInfo(user, body);
  }
}
