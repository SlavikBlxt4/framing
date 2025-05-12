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
    role: "CLIENT" | "PHOTOGRAPHER" | string;
    sub: number;
    iat: number;
    exp: number;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    role: "CLIENT" | "PHOTOGRAPHER";
}
  
  export interface RegisterResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    active: boolean;
}
  