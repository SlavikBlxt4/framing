package com.example.demo.service;


import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import com.example.demo.utils.BookingState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class bookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(int id_client, int id_photographer) {
        if (id_client == 0 || id_photographer == 0) {
            throw new IllegalArgumentException("idClient and idPhotographer cannot be null or zero");
        }

        Booking booking = new Booking();
        booking.setId_client(id_client);
        booking.setId_photographer(id_photographer);
        booking.setState(BookingState.active);
        booking.setDate(LocalDateTime.now());

        return bookingRepository.save(booking);
    }
}
