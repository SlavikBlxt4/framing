package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RatingRequestDTO {
    private Integer serviceId;
    private int ratingValue;
    private String comment;
}
