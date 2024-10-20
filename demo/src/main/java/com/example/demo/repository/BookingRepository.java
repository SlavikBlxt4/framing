package com.example.demo.repository;


import com.example.demo.model.BOOKING;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BOOKING, Integer> {

}
