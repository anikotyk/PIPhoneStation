package com.example.phonestation.service;

import com.example.phonestation.dao.ClientsServiceDao;
import com.example.phonestation.model.ClientService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientsServicesService {
    private final ClientsServiceDao clientsServiceDao;
    public static final int SERVICE_EXPIRING_PERIOD = 30;
    public ClientsServicesService(ClientsServiceDao clientsServiceDao){
        this.clientsServiceDao = clientsServiceDao;
    }

    public void addClientService(Long clientId, Long serviceId){
        LocalDateTime expireDate = LocalDateTime.now().plus(SERVICE_EXPIRING_PERIOD, ChronoUnit.DAYS);
        ClientService clientsService = new ClientService(clientId, serviceId, expireDate);
        clientsServiceDao.save(clientsService);
    }

    public List<Long> getClientServices(Long clientId){
        List<ClientService> clientServices = clientsServiceDao.findAllByClientId(clientId);
        List<Long> servicesIds =  clientServices.stream()
                .map(clientService -> clientService.getServiceId())
                .collect(Collectors.toList());
        return servicesIds;
    }

    public List<Long> getClientActiveServices(Long clientId){
        List<ClientService> clientServices = clientsServiceDao.findAllByClientId(clientId);
        List<ClientService> activeClientServices = clientServices.stream()
                .filter(clientService -> clientService.getExpireDate() == null || clientService.getExpireDate().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());
        List<Long> servicesIds =  activeClientServices.stream()
                .map(clientService -> clientService.getServiceId())
                .collect(Collectors.toList());
        return servicesIds;
    }

    public void removeClientService(Long clientId, Long serviceId){
        ClientService clientService = clientsServiceDao.findByClientIdAndServiceId(clientId, serviceId);
        if (clientService != null) {
            clientsServiceDao.delete(clientService);
        }
    }

    public void deleteAllClientServices(Long clientId){
        List<Long> clientServices = getClientServices(clientId);
        for(int i = 0; i < clientServices.size(); i++){
            removeClientService(clientId, clientServices.get(i));
        }
    }
}

