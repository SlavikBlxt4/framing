package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RatingResponseDTO {
    private Integer id;           // The rating ID
    private Integer serviceId;     // The ID of the service being rated
    private Integer clientId;      // The ID of the client who rated the service
    private int ratingValue;       // The value of the rating
    private String comment;        // The comment for the rating
}
