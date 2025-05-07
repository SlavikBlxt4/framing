// Interface para iniciar sesión

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}