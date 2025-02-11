package com.example.demo.repository;


import com.example.demo.DTO.BookingHistoryDTO;
import com.example.demo.DTO.BookingInfoDTO;
import com.example.demo.DTO.ServiceToRateDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.ServiceClass;
import com.example.demo.DTO.PendingBookingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Booking save(Booking booking);
    List<Booking> findByService(ServiceClass service);
    @Query("SELECT b FROM Booking b WHERE b.client.id = :clientId ORDER BY b.bookingDate DESC")
    List<Booking> findBookingsByClientId(Integer clientId);

    @Query(name = "Booking.findServicesToRate", nativeQuery = true)
    List<ServiceToRateDTO> findServicesToRate(@Param("clientId") Integer clientId);

    // Alternativamente, usa la consulta derivada
    @Query("SELECT new com.example.demo.DTO.BookingInfoDTO(b.id, b.client.id, b.bookingDate, b.state, b.service.id, s.name, s.price, u.name, u.email) " +
            "FROM Booking b " +
            "JOIN b.service s " +
            "JOIN b.client u " +
            "WHERE s.photographer.id = :photographerId " +
            "AND b.state = 'pending'")
    List<BookingInfoDTO> findPendingBookingsByPhotographerId(@Param("photographerId") Integer photographerId);


    @Query("SELECT new com.example.demo.DTO.BookingInfoDTO(b.id, b.client.id, b.bookingDate, b.state, b.service.id, s.name, s.price, c.name, c.email) " +
            "FROM Booking b " +
            "JOIN b.service s " +
            "JOIN b.client c " +
            "WHERE b.client.id = :clientId " +
            "AND b.state = 'pending'")
    List<BookingInfoDTO> findPendingBookingsByClientId(@Param("clientId") Integer clientId);




}
