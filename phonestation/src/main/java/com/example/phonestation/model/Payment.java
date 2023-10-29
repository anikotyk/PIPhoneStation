package com.example.phonestation.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="clientId")
    private long clientId;

    @Column(name="serviceId")
    private long serviceId;

    @Column(name="dateTimeOfCreation")
    private LocalDateTime dateTimeOfCreation;

    public Payment(long clientId, long serviceId){
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.dateTimeOfCreation = LocalDateTime.now();
    }
}

