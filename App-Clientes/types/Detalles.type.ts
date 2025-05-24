import { Availability } from './user'; // asegúrate de tenerlo tipado correctamente

export interface DetallesProps {
  email: string;
  phone: string;
  direccion: string;
  availability: Availability[];
}

export interface DayAvailability {
  day: number;
  slots: {
    start: string;
    end: string;
  }[];
}