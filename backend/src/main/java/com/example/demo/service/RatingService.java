package com.example.demo.service;


import com.example.demo.DTO.RatingRequestDTO;
import com.example.demo.DTO.RatingResponseDTO;
import com.example.demo.model.Rating;
import com.example.demo.model.ServiceClass;
import com.example.demo.model.User;
import com.example.demo.repository.RatingRepository;
import com.example.demo.repository.ServiceClassRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceClassRepository serviceClassRepository;

    public RatingResponseDTO createRating(RatingRequestDTO ratingRequestDTO, Integer clientId) {
        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        ServiceClass service = serviceClassRepository.findById(ratingRequestDTO.getServiceId())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        // Verificar si el cliente ya calificó este servicio
        boolean alreadyRated = ratingRepository.existsByServiceAndClient(service, client);
        if (alreadyRated) {
            throw new RuntimeException("Ya has calificado este servicio");
        }

        Rating rating = new Rating();
        rating.setService(service);
        rating.setClient(client);
        rating.setRating(ratingRequestDTO.getRatingValue());
        rating.setComment(ratingRequestDTO.getComment());

        Rating savedRating = ratingRepository.save(rating);

        return new RatingResponseDTO(
                savedRating.getId(),
                savedRating.getService().getId(),
                savedRating.getClient().getId(),
                savedRating.getRating(),
                savedRating.getComment()
        );
    }

}
