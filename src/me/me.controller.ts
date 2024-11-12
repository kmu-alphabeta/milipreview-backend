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
import { ApiResponse } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

@UseGuards(AuthGuard)
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Get()
  async getMyInfo(@Request() req: AuthRequest) {
    return await this.meService.getMyInfo(req.user);
  }

  @Patch()
  async updateMyInfo(
    @Request() req: AuthRequest,
    @Body() body: UpdateInfoBodyDto,
  ) {
    return await this.meService.updateMyInfo(req.user, body);
  }
}
