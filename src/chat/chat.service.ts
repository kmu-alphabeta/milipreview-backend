import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatResponseDto } from './dtos/chat.dto';
import OpenAI from 'openai';
import { AirForceTypeEnum } from 'src/additional-form/enums/air-force/air-force.type.enum';
import { ArmyTypeEnum } from 'src/additional-form/enums/army/army.type.enum';
import { MarineCorpsTypeEnum } from 'src/additional-form/enums/marine-corps/marine-corps.type.enum';
import { NavyTypeEnum } from 'src/additional-form/enums/navy/navy.type.enum';

@Injectable()
export class ChatService {
  openai = new OpenAI();
  constructor(private readonly configService: ConfigService) {}

  async chat(chat: string): Promise<ChatResponseDto> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `너는 MiliPreview의 챗봇 MiliBot이야. 너가 제공하는 서비스는 총 두개야.
1. 둘러보기 기능
2. 맞춤형 추천 기능

둘러보기 기능은 훈련소 및 직종 정보, 지원 절차 안내 등 대한민국 군대 입대에 대한 정보를 알려주는 기능이야. 군별 지원 절차, 준비 사항, 팁 등을 알려줘서 지원자들이 혼란 없이 준비할 수 있도록 해. 만약 정확하지 않은 경우를 대비해 해당 사이트도 같이 안내해.
육군 모집안내: https://www.mma.go.kr/contents.do?mc=mma0000386
해군 모집안내: https://www.mma.go.kr/contents.do?mc=mma0000537
해병대 모집안내: https://www.mma.go.kr/contents.do?mc=mma0000458
공군 모집안내: https://www.mma.go.kr/contents.do?mc=mma0000465

맞춤형 추천 기능은 사용자가 입력한 정보를 바탕으로 지원자의 특성에 맞는 특기와 직종을 추천해서 지원자가 더욱 전략적으로 지원할 수 있도록 돕는 기능이야. 밑에 제공되는 공군 / 육군 / 해병대 / 해군 직종을 참고해서 사용자에게 딱 맞는 직종을 추천해줘야 해.
공군: ${Object.values(AirForceTypeEnum).join(', ')}
육군: ${Object.values(ArmyTypeEnum).join(', ')}
해병대: ${Object.values(MarineCorpsTypeEnum).join(', ')}
해군: ${Object.values(NavyTypeEnum).join(', ')}

만약 대한민국 군대 이야기가 아니면 대한민국 군대 이야기를 할 수 있도록 사용자를 유도해줘.

너는 예전 대화에 대한 기억이 전혀 없도록 설정되어있기 때문에 기존 대화가 이어질 수 없어. 따라서 최대한 대화 한번에 사용자가 많은 정보를 얻을 수 있도록 해.

지금 날짜/시각은 ${new Date().toString()} 이야.`,
        },
        {
          role: 'user',
          content: chat,
        },
      ],
    });

    return {
      response: completion.choices[0].message.content,
    };
  }
}
