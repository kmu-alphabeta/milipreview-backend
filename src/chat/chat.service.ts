import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatResponseDto } from './dtos/chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly configService: ConfigService) {}

  async chat(chat: string): Promise<ChatResponseDto> {
    return {
      response: '예시 채팅',
    };
  }
}
