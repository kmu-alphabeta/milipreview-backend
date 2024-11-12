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
import { LoginQueryDto, LoginResponseDto } from './dtos/login.dto';
import { AuthRequest, RegisterAuthGuard } from './auth.guard';
import { RegisterBodyDto, RegisterResponseDto } from "./dtos/register.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: LoginResponseDto,
  })
  @Get('login')
  async login(@Query() query: LoginQueryDto) {
    return await this.authService.login(query);
  }

  @ApiResponse({
    type: RegisterResponseDto,
  })
  @UseGuards(RegisterAuthGuard)
  @Post('register')
  async register(@Request() req: AuthRequest, @Body() body: RegisterBodyDto): Promise<RegisterResponseDto> {
    return await this.authService.register(req, body);
  }
}
