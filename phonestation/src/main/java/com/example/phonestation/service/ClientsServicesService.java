package com.example.phonestation.service;

import com.example.phonestation.dao.ClientsServiceDao;
import com.example.phonestation.dao.ServiceDao;
import com.example.phonestation.model.ClientService;
import com.example.phonestation.model.PhoneService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientsServicesService {
    private final ClientsServiceDao clientsServiceDao;
    private final ServiceDao serviceDao;
    public static final int SERVICE_EXPIRING_PERIOD = 30;
    public ClientsServicesService(ClientsServiceDao clientsServiceDao, ServiceDao serviceDao){

        this.clientsServiceDao = clientsServiceDao;
        this.serviceDao = serviceDao;
    }

    public void addClientService(Long clientId, Long serviceId){
        Optional<PhoneService> service = serviceDao.findById(serviceId);
        boolean isTariff  = service.map(PhoneService::getIsTariff).orElse(false);
        if(isTariff){
            var currentTarif = getClientCurrentTariff(clientId);
            if(currentTarif!=null){
                removeClientService(clientId, currentTarif.getId());
            }
        }

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

    public boolean getClientHasTariff(Long clientId) {
        return getClientCurrentTariff(clientId) != null;
    }

    public PhoneService getClientCurrentTariff(Long clientId) {
        var clientServices = getClientActiveServices(clientId);

        for(int i = 0; i < clientServices.size(); i++){
            Long id = clientServices.get(i);
            Optional<PhoneService> service = serviceDao.findById(id);


            if(service.isPresent()){
                boolean isTariff  = service.map(PhoneService::getIsTariff)
                        .orElse(false);
                if(isTariff){ return service.orElseThrow(null); }
            }
        }

        return null;
    }
}

