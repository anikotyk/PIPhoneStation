package com.example.phonestation.service;

import com.example.phonestation.dao.AdminDao;
import com.example.phonestation.model.Admin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminsService {
    private final AdminDao adminDao;

    public AdminsService(AdminDao adminDao){
        this.adminDao = adminDao;
    }

    public boolean isAdmin(String email){
        List<Admin> admin = adminDao.findAllByEmail(email);
        return !admin.isEmpty();
    }
}

