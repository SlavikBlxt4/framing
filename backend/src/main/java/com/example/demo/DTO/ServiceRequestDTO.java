package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceRequestDTO {
    private String name;
    private String description;
    private double price;
    private String imageUrl;  // Agrega este campo
    private String availability;
    private Integer styleId;
    private String styleName;
}
