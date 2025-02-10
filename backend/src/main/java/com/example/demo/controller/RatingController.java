package com.example.demo.controller;

import com.example.demo.DTO.RatingRequestDTO;
import com.example.demo.DTO.RatingResponseDTO;
import com.example.demo.model.Rating;
import com.example.demo.service.RatingService;
import com.example.demo.utils.CustomAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;


    @PostMapping("/rate")
    public ResponseEntity<RatingResponseDTO> rateService(@RequestBody RatingRequestDTO ratingRequestDTO, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer clientId = authToken.getUserId();

        RatingResponseDTO newRating = ratingService.createRating(ratingRequestDTO, clientId);

        return ResponseEntity.ok(newRating);
    }
}
