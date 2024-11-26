import { LoginProvider } from '../dtos/login.dto';

export interface LoginReturn {
  type: LoginProvider;
  value: string;
  name?: string;
  email?: string;
  img?: string;
}
