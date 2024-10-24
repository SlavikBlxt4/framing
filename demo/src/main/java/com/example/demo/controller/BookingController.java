package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.bookingService;
import com.example.demo.model.Booking;
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private bookingService bookingService;

    @PostMapping("/create")
    public Booking create(@RequestBody Booking booking) {
        return bookingService.createBooking(booking.getId_client(), booking.getId_photographer());
    }
}
