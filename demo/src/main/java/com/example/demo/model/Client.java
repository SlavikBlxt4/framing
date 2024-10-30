package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String last_name;
    private String email;
    private String password;

    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number")
    private String phone_number;

    @Column(updatable = false)
    private LocalDateTime registry_date;

    @Column(nullable = false)
    private boolean active = true;

    @PrePersist
    protected void onCreate() {
        registry_date = LocalDateTime.now();
    }
}
