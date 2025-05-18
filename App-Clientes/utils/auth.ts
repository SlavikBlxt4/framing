import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  sub: number;
  email: string;
  role: 'CLIENT' | 'PHOTOGRAPHER';
}

export const getUserFromToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
