package com.example.phonestation.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Services")
public class PhoneService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="price")
    private long price;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="isTariff")
    private Boolean isTariff;

    @Column(name="isDeleted")
    private Boolean isDeleted;

    public PhoneService(
            @JsonProperty("price") long price,
            @JsonProperty("name") String name,
            @JsonProperty("description") String description,
            @JsonProperty("isTariff") Boolean isTariff)
    {
        this.price = price;
        this.name = name;
        this.description = description;
        this.isTariff = isTariff;
        this.isDeleted = false;
    }
}

