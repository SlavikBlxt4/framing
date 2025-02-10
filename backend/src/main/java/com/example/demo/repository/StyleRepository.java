package com.example.demo.repository;


import com.example.demo.model.Style;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StyleRepository extends JpaRepository<Style, Integer> {

    @Override
    <S extends Style> List<S> findAll(Example<S> example);

    @Override
    Optional<Style> findById(Integer integer);

    Optional<Style> findByName(String name);

}
