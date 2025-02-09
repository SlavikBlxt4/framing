package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PendingBookingDTO {
    private Integer bookingId;
    private String serviceName;
    private Double price;
    private String clientName;
    private String clientEmail;
    private String state;
    private String bookingDate;
}
