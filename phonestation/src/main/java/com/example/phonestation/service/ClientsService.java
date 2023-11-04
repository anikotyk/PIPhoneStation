package com.example.phonestation.service;

import com.example.phonestation.dao.ClientDao;
import com.example.phonestation.model.Client;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ClientsService {
    private final ClientDao clientDao;
    public static final int YEARS_INACTIVE_TO_DELETE = 5;

    public ClientsService(ClientDao clientDao){
        this.clientDao = clientDao;
    }

    public List<Client> getAllClients(){
        List<Client> clients = clientDao.findAll();
        return clients;
    }

    public List<Client> getAllInactiveClients(){
        LocalDateTime fiveYearsAgo = LocalDateTime.now().minus(YEARS_INACTIVE_TO_DELETE, ChronoUnit.YEARS);
        return clientDao.findAllByLastVisitDateBefore(fiveYearsAgo);
    }

    public List<Client> getAllActiveClientsInPeriod(LocalDateTime thresholdDate){
       return clientDao.findAllByLastVisitDateAfter(thresholdDate);
    }

    public Client getClient(String clientEmail){
        List<Client> clients = clientDao.findAllByEmail(clientEmail);
        Client client;
        if(clients.size()<1){
            addNewClient(clientEmail);
            client = clientDao.findAllByEmail(clientEmail).get(0);
        }else{
            client = clients.get(0);
        }
        return client;
    }

    public void addNewClient(String clientEmail){
        Client client = new Client();
        client.setEmail(clientEmail);
        client.setLastVisitDate(LocalDateTime.now());
        clientDao.save(client);
    }

    public void setClientPhone(Long clientId, long clientPhone){
        Client client = clientDao.findById(clientId).get();
        client.setPhonenumber(clientPhone);
        clientDao.save(client);
    }

    public void setClientUsername(Long clientId, String username){
        Client client = clientDao.findById(clientId).get();
        client.setUsername(username);
        clientDao.save(client);
    }

    public void setClientLastVisitTimeNow(Long clientId){
        Client client = clientDao.findById(clientId).get();
        client.setLastVisitDate(LocalDateTime.now());
        clientDao.save(client);
    }

    public void deleteClient(Long clientId){
        Client client = clientDao.findById(clientId).get();
        clientDao.delete(client);
    }
}

