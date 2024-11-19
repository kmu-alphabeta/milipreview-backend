import { Injectable } from '@nestjs/common';

const CLIENT_ID = '19efadd74f9cceedca517bcdced765a4';
const REDIRECT_URI = 'http://localhost:3000/oauth';

const getKakaoLoginUrl = () =>
  `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

@Injectable()
export class AppService {
  getHello(): string {
    return `<script>window.location.href = '${getKakaoLoginUrl()}';</script>`;
  }
}
