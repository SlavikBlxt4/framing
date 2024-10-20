package com.example.demo.service;

import com.example.demo.repository.ClientRepository;
import com.example.demo.model.CLIENT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class clientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<CLIENT> findAll() {

        return clientRepository.findAll();

    }

    public CLIENT insertClient(CLIENT client) {
        return clientRepository.save(client);
    }
}
