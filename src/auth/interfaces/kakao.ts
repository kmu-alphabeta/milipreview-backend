export interface KakaoProfile {
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
}

export interface KakaoAccount {
  profile: KakaoProfile;
  has_email: boolean;
  email: string;
}

export interface KakaoResponse {
  id: number;
  kakao_account: KakaoAccount;
}
