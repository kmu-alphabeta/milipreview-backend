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
import { RegisterBodyDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Query() query: LoginQueryDto) {
    return await this.authService.login(query);
  }

  @UseGuards(RegisterAuthGuard)
  @Post('register')
  async register(@Request() req: AuthRequest, @Body() body: RegisterBodyDto) {
    return await this.authService.register(req, body);
  }
}
