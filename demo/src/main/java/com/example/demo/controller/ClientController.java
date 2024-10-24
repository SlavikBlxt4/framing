package com.example.demo.controller;


import com.example.demo.model.Client;
import com.example.demo.service.clientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private clientService clientService;

    @GetMapping("/findAll")

    public List<Client> findAll() {
        return clientService.findAll();
    }

    @PostMapping("/insert")
    public Client insert(@RequestBody Client client) {
        return clientService.insertClient(client);
    }
}
