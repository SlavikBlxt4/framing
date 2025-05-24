export interface Slot {
  start: string; // ej. "08:00:00"
  end: string;   // ej. "12:00:00"
}

export interface Availability {
  day: number; // 1 = lunes, 7 = domingo
  slots: Slot[];
}

export interface UsuarioProps {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  role: "CLIENT" | "PHOTOGRAPHER";
  active?: boolean;
  url_profile_image?: string;
  description?: string;

  locations?: {
    coordinates: {
      coordinates: [number, number]; // [lon, lat]
    };
  }[];

  availability?: {
    day: number;
    slots: {
      start: string;
      end: string;
    }[];
  }[];

  
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