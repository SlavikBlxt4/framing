package com.example.demo.controller;

import com.example.demo.DTO.ServiceRequestDTO;
import com.example.demo.DTO.ServiceResponseDTO;
import com.example.demo.DTO.TopRatedServicesDTO;
import com.example.demo.DTO.TopServiceDto;
import com.example.demo.model.ServiceClass;
import com.example.demo.model.Style;
import com.example.demo.model.User;
import com.example.demo.repository.StyleRepository;
import com.example.demo.service.serviceClassService;
import com.example.demo.service.userService;
import com.example.demo.utils.CustomAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/photographer/serviceClass")
public class ServiceClassController {

    @Autowired
    private serviceClassService serviceClassService;

    @Autowired
    private StyleRepository styleRepository;




    @PostMapping("/create")
    public ResponseEntity<ServiceResponseDTO> createService(@RequestBody ServiceRequestDTO serviceRequestDTO, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer photographerId = authToken.getUserId();

        // Convertir el nombre del estilo a su ID correspondiente
        String styleName = serviceRequestDTO.getStyleName();
        Optional<Style> styleOptional = styleRepository.findByName(styleName);
        if (styleOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new ServiceResponseDTO(null, "Estilo no encontrado", null, 0.0, null, null));
        }
        Style style = styleOptional.get();
        serviceRequestDTO.setStyleId(style.getId());

        // Crear el servicio con el ID del fotógrafo autenticado
        ServiceClass createdService = serviceClassService.createService(serviceRequestDTO, photographerId);

        // Convertir a DTO para excluir el fotógrafo
        ServiceResponseDTO responseDTO = new ServiceResponseDTO(
                createdService.getId(),
                createdService.getName(),
                createdService.getDescription(),
                createdService.getPrice(),
                createdService.getImageUrl(),  // Devuelve la URL de la imagen
                createdService.getStyle().getName()  // Ejemplo de incluir el nombre del estilo
        );

        return ResponseEntity.ok(responseDTO);
    }


    @GetMapping("/top-rated")
    public ResponseEntity<List<TopRatedServicesDTO>> getTopRatedServices() {
        List<TopRatedServicesDTO> topRatedServices = serviceClassService.getTop10HighestRatedServices();
        return ResponseEntity.ok(topRatedServices);
    }

    /*@GetMapping("/top-sold")
    public List<TopServiceDto> getTop10MostSoldServices() {
        return serviceClassService.getTop10MostSoldServices();
    }*/

    @DeleteMapping("/delete/{serviceId}")
    public ResponseEntity<String> deleteService(@PathVariable Integer serviceId, Authentication authentication) {
        CustomAuthenticationToken authToken = (CustomAuthenticationToken) authentication;
        Integer photographerId = authToken.getUserId();

        boolean isDeleted = serviceClassService.deleteService(serviceId, photographerId);
        if (isDeleted) {
            return ResponseEntity.ok("Service deleted successfully");
        } else {
            return ResponseEntity.status(403).body("Unauthorized to delete this service");
        }
    }



    @GetMapping("/{styleName}")
    public List<ServiceResponseDTO> findByStyleName(@PathVariable String styleName) {
        return serviceClassService.getServicesByStyleName(styleName);
    }


}
