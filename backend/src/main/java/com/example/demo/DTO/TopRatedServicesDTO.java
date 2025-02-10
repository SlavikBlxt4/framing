package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TopRatedServicesDTO {
    private int serviceId;
    private String serviceName;
    private String imageUrl;
    private Double averageRating;
}
