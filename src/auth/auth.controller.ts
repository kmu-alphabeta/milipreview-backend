import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDto, LoginResponseDto } from './dtos/login.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { AuthGuard, AuthInfo, AuthRequest } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  async login(@Body() { type, code }: LoginBodyDto) {
    return await this.authService.login(type, code);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    type: User,
  })
  @Get('me')
  async me(@Request() { user }: AuthRequest) {
    return await this.authService.me(user);
  }
}
