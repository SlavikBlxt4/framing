package com.example.demo.controller;


import com.example.demo.DTO.*;
import com.example.demo.model.Booking;
import com.example.demo.model.ServiceClass;
import com.example.demo.utils.BookingState;
import com.example.demo.service.bookingService;
import com.example.demo.service.serviceClassService;
import com.example.demo.service.userService;
import com.example.demo.utils.CustomAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private bookingService bookingService;

    @Autowired
    private userService userService;

    @Autowired
    private serviceClassService serviceClassService;

    @PostMapping("/create")
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody BookingRequestDTO bookingRequestDTO, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer clientId = authToken.getUserId();
        ServiceClass service = serviceClassService.findServiceById(bookingRequestDTO.getServiceId());
        LocalDateTime date = LocalDateTime.parse(bookingRequestDTO.getDateTime());  // Convertir a LocalDateTime

        Booking booking = bookingService.createBooking(clientId, service, date);
        BookingResponseDTO responseDTO = new BookingResponseDTO(
                booking.getId(),
                booking.getService().getName(),
                booking.getService().getPrice(),
                booking.getDate().toString(),
                booking.getClient().getName(),
                booking.getClient().getEmail(),
                booking.getState().toString()
        );

        return ResponseEntity.ok(responseDTO);
    }



    @PostMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Integer id, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer photographerId = authToken.getUserId();
        Booking updatedBooking = bookingService.updateBookingStatus(id, photographerId, BookingState.active);
        BookingResponseDTO responseDTO = new BookingResponseDTO(
                updatedBooking.getId(),
                updatedBooking.getService().getName(),
                updatedBooking.getService().getPrice(),
                updatedBooking.getDate().toString(),
                updatedBooking.getClient().getName(),
                updatedBooking.getClient().getEmail(),
                updatedBooking.getState().toString()
        );

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer id, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer photographerId = authToken.getUserId();
        Booking updatedBooking = bookingService.updateBookingStatus(id, photographerId, BookingState.cancelled);
        BookingResponseDTO responseDTO = new BookingResponseDTO(
                updatedBooking.getId(),
                updatedBooking.getService().getName(),
                updatedBooking.getService().getPrice(),
                updatedBooking.getDate().toString(),
                updatedBooking.getClient().getName(),
                updatedBooking.getClient().getEmail(),
                updatedBooking.getState().toString()
        );

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/history")
    public ResponseEntity<List<BookingHistoryDTO>> getBookingHistory(Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer clientId = authToken.getUserId();
        List<BookingHistoryDTO> bookingHistory = bookingService.getClientBookingHistory(clientId);
        return ResponseEntity.ok(bookingHistory);
    }

    @GetMapping("/services-to-rate")
    public ResponseEntity<List<ServiceToRateDTO>> getServicesToRate(Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer clientId = authToken.getUserId();
        List<ServiceToRateDTO> servicesToRate = bookingService.getServicesToRate(clientId);
        return ResponseEntity.ok(servicesToRate);
    }

    @GetMapping("/pending-bookings")
    public ResponseEntity<List<BookingInfoDTO>> getPendingBookings(Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer photographerId = authToken.getUserId();
        List<BookingInfoDTO> pendingBookings = bookingService.findByServicePhotographerIdAndState(photographerId);
        return ResponseEntity.ok(pendingBookings);
    }
}
