package com.example.demo.controller;

import com.example.demo.model.PHOTOGRAPHER;
import com.example.demo.service.photographerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/photographer")
public class PhotographerController {
    @Autowired
    private photographerService photographerService;

    @GetMapping("/findAll")
    public List<PHOTOGRAPHER> findAll() {
        return photographerService.findAll();
    }
}
