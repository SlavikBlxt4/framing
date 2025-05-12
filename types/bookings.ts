export interface BookingHistoryDto {
    bookingId: number;
    serviceName: string;
    bookingDate: string;
    date: string;
    status: 'pending' | 'active' | 'done';
}