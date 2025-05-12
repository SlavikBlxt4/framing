export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Rating {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  minimum_minutes: number;
  discount: string;
  ratings: Rating[];
  category: Category;
}

export interface Location {
  id: number;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface DayAvailability {
  day: number;
  slots: TimeSlot[];
}

export interface Photographer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  registry_date: string | null;
  active: boolean;
  role: "PHOTOGRAPHER";
  description: string | null;
  url_portfolio: string | null;
  url_profile_image: string | null;
  services: Service[];
  locations: Location[];
  averageRating: number;
  availability: DayAvailability[];
} 