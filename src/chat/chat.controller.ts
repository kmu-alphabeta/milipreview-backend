import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ChatBodyDto, ChatResponseDto } from './dtos/chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @ApiResponse({
    type: ChatResponseDto,
  })
  @Post()
  async chat(@Body() { chat }: ChatBodyDto): Promise<ChatResponseDto> {
    return await this.chatService.chat(chat);
  }
}
