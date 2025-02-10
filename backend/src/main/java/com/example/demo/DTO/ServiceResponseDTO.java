package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceResponseDTO {
    private Integer serviceId;
    private String serviceName;
    private String serviceDescription;
    private Double price;
    private String imageUrl;  // Incluye la URL de la imagen
    private String styleName; // Puedes incluir aquí otros campos si son necesarios
}