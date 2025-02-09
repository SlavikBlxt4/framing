package com.example.demo.model;

import com.example.demo.DTO.ServiceToRateDTO;
import com.example.demo.utils.BookingState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

@SqlResultSetMapping(
        name = "ServiceToRateDTOMapping",
        classes = @ConstructorResult(
                targetClass = ServiceToRateDTO.class,
                columns = {
                        @ColumnResult(name = "serviceId", type = Integer.class),
                        @ColumnResult(name = "serviceName", type = String.class),
                        @ColumnResult(name = "serviceDescription", type = String.class),
                        @ColumnResult(name = "price", type = Double.class),
                        @ColumnResult(name = "imageUrl", type = String.class),
                        @ColumnResult(name = "bookingId", type = Integer.class),
                        @ColumnResult(name = "bookingDate", type = LocalDateTime.class),
                        @ColumnResult(name = "serviceDate", type = LocalDateTime.class)
                }
        )
)
@NamedNativeQuery(
        name = "Booking.findServicesToRate",
        query = """
        SELECT s.id AS serviceId,
               s.name AS serviceName,
               s.description AS serviceDescription,
               s.price AS price,
               s.image_url AS imageUrl,
               b.id AS bookingId,
               b.booking_date AS bookingDate,
               b.date AS serviceDate
        FROM booking b
        JOIN service s ON b.service_id = s.id
        WHERE b.client_id = :clientId
          AND b.state = 'done'
          AND s.id NOT IN (
              SELECT r.service_id
              FROM rating r
              WHERE r.client_id = :clientId
          )
    """,
        resultSetMapping = "ServiceToRateDTOMapping"
)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceClass service;
    @Column(nullable = false)
    @JoinColumn(name = "booking_date")
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingState state;

    @Column(nullable = false)
    private LocalDateTime date;
}
