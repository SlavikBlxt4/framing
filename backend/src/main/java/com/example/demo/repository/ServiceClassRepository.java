package com.example.demo.repository;

import com.example.demo.DTO.ServiceResponseDTO;
import com.example.demo.DTO.TopRatedServicesDTO;
import com.example.demo.DTO.TopRatedServicesDTO;
import com.example.demo.DTO.TopServiceDto;
import com.example.demo.model.ServiceClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceClassRepository extends JpaRepository<ServiceClass, Integer> {

    <S extends ServiceClass> S save(S entity);

    List<ServiceClass> findByPhotographerId(int photographer_id);

    @Override
    void delete(ServiceClass entity);

    @Override
    Optional<ServiceClass> findById(Integer integer);

    //metodo para listar top 10 servicios mas vendidos
    @Query("SELECT s.id AS serviceId, s.name AS serviceName, COUNT(b.id) AS bookingCount " +
            "FROM ServiceClass s " +
            "JOIN Booking b ON s.id = b.service.id " +
            "GROUP BY s.id, s.name " +
            "ORDER BY bookingCount DESC")
    List<TopServiceDto> findTop10MostSoldServices();

    @Query("SELECT new com.example.demo.DTO.TopRatedServicesDTO(s.id, s.name, s.imageUrl, AVG(r.rating)) " +
            "FROM ServiceClass s " +
            "JOIN s.ratings r " +
            "GROUP BY s.id, s.name " +
            "ORDER BY AVG(r.rating) DESC")
    List<TopRatedServicesDTO> findTop10HighestRatedServices();

    @Query("SELECT s FROM ServiceClass s JOIN s.style st WHERE st.name = :styleName")
    List<ServiceClass> findByStyleName(@Param("styleName") String styleName);



}
