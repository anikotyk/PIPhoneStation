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
@Table(name = "ClientsServices")
public class ClientService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="clientId")
    private long clientId;

    @Column(name="serviceId")
    private long serviceId;

    @Column(name="expireDate")
    private LocalDateTime expireDate;

    public ClientService(long clientId, long serviceId, LocalDateTime expireDate){
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.expireDate = expireDate;
    }
}
