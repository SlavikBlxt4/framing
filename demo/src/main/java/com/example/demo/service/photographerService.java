package com.example.demo.service;


import com.example.demo.model.PHOTOGRAPHER;
import com.example.demo.repository.PhotographerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class photographerService {
    @Autowired
    private PhotographerRepository photographerRepository;

    public List<PHOTOGRAPHER> findAll() {
        return photographerRepository.findAll();
    }
}
