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
import { AuthRequest, RegisterAuthGuard } from './auth.guard';
import { RegisterBodyDto, RegisterResponseDto } from './dtos/register.dto';
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

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

  @ApiResponse({
    type: RegisterResponseDto,
  })
  @UseGuards(RegisterAuthGuard)
  @Post('register')
  @ApiBearerAuth()
  async register(
    @Request() { user }: AuthRequest,
    @Body() body: RegisterBodyDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(user, body);
  }
}
