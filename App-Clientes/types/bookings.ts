export interface BookingHistoryDto {
    bookingId: number;
    serviceId: number;
    serviceName: string;
    bookingDate: string;
    date: string;
    status: 'pending' | 'active' | 'done' | 'cancelled';
}