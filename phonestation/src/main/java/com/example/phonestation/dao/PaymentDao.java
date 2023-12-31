package com.example.phonestation.dao;

import com.example.phonestation.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PaymentDao extends JpaRepository<Payment, Long> {
    public List<Payment> findAllByClientId(long clientId);
    List<Payment> findAllByDateTimeOfCreationAfter(LocalDateTime date);
}
