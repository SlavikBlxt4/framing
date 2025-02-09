package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingHistoryDTO {
    private Integer bookingId;
    private LocalDateTime bookingDate;
    private LocalDateTime date;
    private String serviceName;
    private String status;
}
