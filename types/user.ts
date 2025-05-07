export interface UsuarioProps {
    id: number;
    email: string;
    role?: string;
}
  

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    role: "CLIENT" | "VENDOR" | string;
    sub: number;
    iat: number;
    exp: number;
}