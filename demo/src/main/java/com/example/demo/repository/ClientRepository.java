package com.example.demo.repository;


import com.example.demo.model.CLIENT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<CLIENT, Integer> {
    @Override
    List<CLIENT> findAll();
}
