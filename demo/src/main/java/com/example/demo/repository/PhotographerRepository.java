package com.example.demo.repository;


import com.example.demo.model.PHOTOGRAPHER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotographerRepository extends JpaRepository<PHOTOGRAPHER, Integer> {
    @Override
    List<PHOTOGRAPHER> findAll();
}
