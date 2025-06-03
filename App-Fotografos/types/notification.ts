export type Notification = {
  id: number;
  user: {
    id: number;
    name?: string;
  };
  title: string;
  message: string;
  type?: string | null;
  read: boolean;
  createdAt: string;
  // SESSION_REQUESTED and booking-related properties
  bookingId?: number;
  clientName?: string;
  clientEmail?: string;
  serviceName?: string;
  bookingDate?: string;
  bookingDuration?: number;
  bookingPrice?: number;
};