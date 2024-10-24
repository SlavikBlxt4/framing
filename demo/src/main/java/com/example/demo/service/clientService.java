package com.example.demo.service;

import com.example.demo.repository.ClientRepository;
import com.example.demo.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class clientService {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Client> findAll() {

        return clientRepository.findAll();

    }

    public Client insertClient(Client client) {
        String encodedPassword = passwordEncoder.encode(client.getPassword());
        client.setPassword(encodedPassword);
        return clientRepository.save(client);
    }

    public boolean login(String email, String password) {
        Optional<Client> client = clientRepository.findByEmail(email);
        if(client.isPresent()){
            if(passwordEncoder.matches(password, client.get().getPassword())){
                return true;
            }
        }
        return false;
    }
}
