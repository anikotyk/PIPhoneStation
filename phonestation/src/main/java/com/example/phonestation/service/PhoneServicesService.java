package com.example.phonestation.service;

import com.example.phonestation.dao.ServiceDao;
import com.example.phonestation.model.PhoneService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhoneServicesService {
    private final ServiceDao serviceDao;

    public PhoneServicesService(ServiceDao serviceDao){
        this.serviceDao = serviceDao;
    }

    public List<PhoneService> getAllServices(){
        List<PhoneService> services = serviceDao.findAll();
        return services;
    }

    public List<PhoneService> getAllActiveServices(){
        List<PhoneService> services = serviceDao.findAll();
        List<PhoneService> activeServices = services.stream()
                .filter(service -> !service.getIsDeleted())
                .collect(Collectors.toList());
        return activeServices;
    }

    public List<PhoneService> getAllServicesByIds(List<Long> ids){
        List<PhoneService> services = new ArrayList<>();
        for(int i = 0; i < ids.size(); i++){
            services.add(serviceDao.findById(ids.get(i)).get());
        }
        return services;
    }

    public void addPhoneService(long price, String name, String description, Boolean isTariff){
        PhoneService phoneService = new PhoneService(price, name, description, isTariff);
        serviceDao.save(phoneService);
    }

    public void deletePhoneService(Long serviceId){
        PhoneService phoneService = serviceDao.findById(serviceId).get();
        phoneService.setIsDeleted(true);
        serviceDao.save(phoneService);
    }

    public void editPhoneService(Long serviceId, long price, String name, String description, Boolean isTariff){
        deletePhoneService(serviceId);
        addPhoneService(price, name, description, isTariff);
    }
}

