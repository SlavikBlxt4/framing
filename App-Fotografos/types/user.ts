export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    role: "PHOTOGRAPHER";
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

export interface PhotographerProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  registry_date: string | null;
  active: boolean;
  role: 'PHOTOGRAPHER';
  description: string | null;
  url_portfolio: string | null;
  url_profile_image: string | null;
  services: PhotographerService[];
  locations: any[]; // si en el futuro se define el tipo, lo actualizamos
  averageRating: number;
  availability: Availability[];
}

export interface PhotographerService {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  minimum_minutes: number;
  discount: string;
  ratings: Rating[]; // vacía por ahora, pero puedes definirla si luego se usa
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Rating {
  id: number;
  rating: number;
  comment?: string;
  created_at?: string;
  // Añade más campos si los ratings se usan luego
}

export interface Availability {
  day: number; // 1 (lunes) a 7 (domingo)
  slots: string[]; // ejemplo: ["10:00", "11:00"] o vacío []
}