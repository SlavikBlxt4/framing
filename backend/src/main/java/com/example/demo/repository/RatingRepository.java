package com.example.demo.repository;

import com.example.demo.model.Rating;
import com.example.demo.model.ServiceClass;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    @Override
    <S extends Rating> S save(S entity);

    @Override
    Optional<Rating> findById(Integer integer);

    boolean existsByServiceAndClient(ServiceClass service, User client);
}
