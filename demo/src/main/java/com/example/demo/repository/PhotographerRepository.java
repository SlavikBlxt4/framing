package com.example.demo.repository;


import com.example.demo.model.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {
    @Override
    List<Photographer> findAll();

}
