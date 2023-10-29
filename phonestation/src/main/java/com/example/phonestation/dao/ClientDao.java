package com.example.phonestation.dao;

import com.example.phonestation.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClientDao extends JpaRepository<Client, Long> {
    public List<Client> findAllByEmail(String email);
    List<Client> findAllByLastVisitDateBefore(LocalDateTime date);
    List<Client> findAllByLastVisitDateAfter(LocalDateTime date);
}
