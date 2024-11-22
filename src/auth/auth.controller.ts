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
}
