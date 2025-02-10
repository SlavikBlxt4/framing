package com.example.demo.service;


import com.example.demo.model.Style;
import com.example.demo.repository.StyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class styleService {
    @Autowired
    private StyleRepository styleRepository;

    public List<Style> getAllStyles() {
        return styleRepository.findAll();
    }
}
