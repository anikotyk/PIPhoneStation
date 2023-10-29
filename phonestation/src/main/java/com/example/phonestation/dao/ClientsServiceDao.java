package com.example.phonestation.dao;

import com.example.phonestation.model.ClientService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientsServiceDao extends JpaRepository<ClientService, Long> {
    public List<ClientService> findAllByClientId(long clientId);
    public ClientService findByClientIdAndServiceId(long clientId, long serviceId);
}
