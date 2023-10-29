package com.example.phonestation.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@NoArgsConstructor
@Entity
@Table(name = "Clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="phonenumber")
    private long phonenumber;

    @Column(name="email")
    private String email;

    @Column(name="username")
    private String username;

    @Column(name="lastVisitDate")
    private LocalDateTime lastVisitDate;

    public Client(
                  @JsonProperty("phonenumber") long phonenumber,
                  @JsonProperty("email") String email,
                  @JsonProperty("username") String username)
    {
        this.phonenumber = phonenumber;
        this.email = email;
        this.username = username;
        this.lastVisitDate = LocalDateTime.now();
    }
}
