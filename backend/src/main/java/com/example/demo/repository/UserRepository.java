package com.example.demo.repository;


import com.example.demo.model.User;
import com.example.demo.DTO.TopPhotographerProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    List<User> findAll();

    @Override
    <S extends User> S save(S entity);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Override
    Optional<User> findById(Integer integer);

    @Query("SELECT u.id AS photographerId, u.name AS photographerName, COUNT(b.id) AS bookingCount " +
            "FROM User u " +
            "JOIN u.services s " +
            "JOIN s.bookings b " +
            "WHERE u.role = 'PHOTOGRAPHER' " +
            "GROUP BY u.id, u.name " +
            "ORDER BY bookingCount DESC")
    List<TopPhotographerProjection> findTop10PhotographersByBookings();

    //metodo para saber top 10 fotografos con mas reservas:

    /*SELECT u.id AS photographer_id,
    u.name AS photographer_name,
    COUNT(b.id) AS booking_count
    FROM users u
    JOIN service s ON u.id = s.photographer_id
    JOIN booking b ON s.id = b.service_id
    WHERE u.role = 'PHOTOGRAPHER'
    GROUP BY u.id, u.name
    ORDER BY booking_count DESC
    LIMIT 10;*/

}
