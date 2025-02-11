package com.example.demo.DTO;

import com.example.demo.utils.BookingState;

import java.time.LocalDateTime;

public class BookingInfoDTO {

    private Integer bookingId;
    private Integer clientId;
    private LocalDateTime bookingDate;
    private BookingState state;
    private Integer serviceId;
    private String serviceName;
    private double price;
    private String clientName;
    private String clientEmail;

    public BookingInfoDTO(Integer bookingId, Integer clientId, LocalDateTime bookingDate, BookingState state, Integer serviceId, String serviceName, double price, String clientName, String clientEmail) {
        this.bookingId = bookingId;
        this.clientId = clientId;
        this.bookingDate = bookingDate;
        this.state = state;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.price = price;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
    }



    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BookingState getState() {
        return state;
    }

    public void setState(BookingState state) {
        this.state = state;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }
}
