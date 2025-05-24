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

