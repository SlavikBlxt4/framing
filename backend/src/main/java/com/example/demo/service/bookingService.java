package com.example.demo.service;


import com.example.demo.DTO.BookingHistoryDTO;
import com.example.demo.DTO.BookingInfoDTO;
import com.example.demo.DTO.ServiceToRateDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.ServiceClass;
import com.example.demo.model.User;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.BookingState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class bookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SendGridService sendGridService;

    public Booking createBooking(Integer clientId, ServiceClass service, LocalDateTime date) {

        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Check availability, for example, prevent double-booking at the same time
        List<Booking> existingBookings = bookingRepository.findByService(service);
        for (Booking existingBooking : existingBookings) {
            if (existingBooking.getDate().equals(date)) {
                throw new IllegalArgumentException("Service is already booked at this date and time.");
            }
        }

        // Create a new booking if available
        Booking booking = new Booking();
        booking.setClient(client);
        booking.setService(service);
        booking.setDate(date);
        booking.setBookingDate(LocalDateTime.now());
        booking.setState(BookingState.valueOf("pending"));  // Initial state

        // Send email to client about pending confirmation
        sendGridService.sendEmail(
                booking.getClient().getEmail(),
                "Booking Created - Awaiting Confirmation",
                "Thank you for booking " + service.getName() +
                        ". We will notify you when the photographer confirms or cancels the booking."
        );

        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Integer bookingId, Integer photographerId, BookingState newStatus) {
        // Fetch the booking by ID
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Check if the photographer owns the service related to this booking
        if (!booking.getService().getPhotographer().getId().equals(photographerId)) {
            throw new RuntimeException("You are not authorized to confirm or cancel this booking");
        }

        // Update the booking status
        booking.setState(newStatus);
        Booking updatedBooking = bookingRepository.save(booking);

        // Send email notification based on new booking status
        String emailContent;
        String subject;

        if (newStatus == BookingState.active) {  // Confirmed booking
            subject = "Booking Confirmed";
            emailContent = "Your booking for " + booking.getService().getName() + " has been confirmed.";
        } else if (newStatus == BookingState.cancelled) {  // Cancelled booking
            subject = "Booking Cancelled";
            emailContent = "Unfortunately, your booking for " + booking.getService().getName() + " has been cancelled.";
        } else {
            return updatedBooking; // Skip email if it's another status
        }

        // Send the email
        sendGridService.sendEmail(
                booking.getClient().getEmail(),  // Client's email
                subject,
                emailContent
        );

        return updatedBooking;
    }

    public List<BookingHistoryDTO> getClientBookingHistory(Integer clientId) {
        List<Booking> bookings = bookingRepository.findBookingsByClientId(clientId);

        // Convert each Booking to BookingHistoryDTO
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private BookingHistoryDTO convertToDto(Booking booking) {
        BookingHistoryDTO dto = new BookingHistoryDTO();
        dto.setBookingId(booking.getId());
        dto.setServiceName(booking.getService().getName());
        dto.setBookingDate(booking.getBookingDate());
        dto.setDate(booking.getDate());
        dto.setStatus(booking.getState().name());
        return dto;
    }

    public List<ServiceToRateDTO> getServicesToRate(Integer clientId) {
        return bookingRepository.findServicesToRate(clientId);
    }

    public List<BookingInfoDTO> findByServicePhotographerIdAndState(Integer photographerId) {
        return bookingRepository.findPendingBookingsByPhotographerId(photographerId);
    }

    public List<BookingInfoDTO> findByServiceClientIdAndState(Integer clientId) {
        return bookingRepository.findPendingBookingsByClientId(clientId);
    }
}
