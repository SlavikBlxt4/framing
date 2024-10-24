package com.example.demo.service;


import com.example.demo.model.Photographer;
import com.example.demo.repository.PhotographerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class photographerService {
    @Autowired
    private PhotographerRepository photographerRepository;

    public List<Photographer> findAll() {
        return photographerRepository.findAll();
    }


}
