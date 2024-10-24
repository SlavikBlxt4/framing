package com.example.demo.repository;


import com.example.demo.model.Booking;
import com.example.demo.model.Client;
import com.example.demo.model.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Booking save(Booking booking);
    List<Booking> findById(int id);

}
