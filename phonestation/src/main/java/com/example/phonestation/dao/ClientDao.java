package com.example.phonestation.dao;

import com.example.phonestation.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientDao extends JpaRepository<Client, Long> {
    public List<Client> findAllByEmail(String email);
}
