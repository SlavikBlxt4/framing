package com.example.demo.controller;


import com.example.demo.model.CLIENT;
import com.example.demo.service.clientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private clientService clientService;

    @GetMapping("/findAll")

    public List<CLIENT> findAll() {
        return clientService.findAll();
    }
}
