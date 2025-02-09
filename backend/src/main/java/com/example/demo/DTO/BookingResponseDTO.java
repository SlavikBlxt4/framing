package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookingResponseDTO {
    private Integer id;
    private String serviceName;
    private Double price;
    private String dateTime;
    private String clientName;
    private String clientEmail;
    private String state;
}
