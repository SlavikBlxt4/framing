package com.example.demo.service;

import com.example.demo.repository.ClientRepository;
import com.example.demo.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class clientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll() {

        return clientRepository.findAll();

    }

    public Client insertClient(Client client) {
        return clientRepository.save(client);
    }
}
