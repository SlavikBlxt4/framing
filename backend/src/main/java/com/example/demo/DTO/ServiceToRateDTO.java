package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
public class ServiceToRateDTO {
    private Integer serviceId;
    private String serviceName;
    private String serviceDescription;
    private Double price;
    private String imageUrl;
    private Integer bookingId;
    private LocalDateTime bookingDate;
    private LocalDateTime serviceDate;
}