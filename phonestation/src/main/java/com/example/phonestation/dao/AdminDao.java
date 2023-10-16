package com.example.phonestation.dao;

import com.example.phonestation.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminDao extends JpaRepository<Admin, Long> {
    public List<Admin> findAllByEmail(String email);
}
