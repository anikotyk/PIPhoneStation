package com.example.phonestation.dao;

import com.example.phonestation.model.PhoneService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceDao extends JpaRepository<PhoneService, Long> {
}
