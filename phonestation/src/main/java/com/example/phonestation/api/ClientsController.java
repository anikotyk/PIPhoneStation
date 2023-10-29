package com.example.phonestation.api;

import com.example.phonestation.model.Client;
import com.example.phonestation.service.ClientsService;
import com.example.phonestation.service.ClientsServicesService;
import com.example.phonestation.service.PaymentsService;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("")
@RestController
public class ClientsController {
    private final ClientsService clientService;
    private final ClientsServicesService clientsServicesService;
    private final PaymentsService paymentsService;

    @Autowired
    public ClientsController(ClientsService clientService, ClientsServicesService clientsServicesService, PaymentsService paymentsService){

        this.clientService = clientService;
        this.clientsServicesService = clientsServicesService;
        this.paymentsService = paymentsService;
    }

    @GetMapping("/get-all-clients")
    public String getAllClients(){
        List<Client> clients = clientService.getAllClients();
        String json = new Gson().toJson(clients);
        return json;
    }

    @PostMapping("/get-client")
    public String getClient(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        String clientEmail = obj.getString("clientEmail");

        Client client = clientService.getClient(clientEmail);
        String json = new Gson().toJson(client);
        return json;
    }

    @PostMapping("/set-client-phone")
    public void setClientPhone(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);

        long clientId = obj.getLong("clientId");
        long clientPhone = obj.getLong("clientPhone");
        clientService.setClientPhone(clientId, clientPhone);
    }

    @PostMapping("/set-client-username")
    public void setClientUsername(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);

        long clientId = obj.getLong("clientId");
        String clientUsername = obj.getString("clientUsername");
        clientService.setClientUsername(clientId, clientUsername);
    }

    @PostMapping("/on-client-visited")
    public void onClientVisited(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);

        long clientId = obj.getLong("clientId");
        clientService.setClientLastVisitTimeNow(clientId);
    }

    @PostMapping("/delete-inactive-clients")
    public void deleteInactiveUsers(@RequestBody String body) throws JSONException {
        List<Client> clients = clientService.getAllInactiveClients();
        for(int i = 0; i < clients.size(); i++){
            Long clientId = clients.get(i).getId();
            clientService.deleteClient(clientId);
            clientsServicesService.deleteAllClientServices(clientId);
            paymentsService.deleteAllClientPayments(clientId);
        }
    }

    @PostMapping("/get-count-active-users-in-period")
    public String getCountActiveUsersInPeriod(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        int daysCount = obj.getInt("daysCount");
        LocalDateTime thresholdDate = LocalDateTime.now().minusDays(daysCount);
        List<Client> activeClients = clientService.getAllActiveClientsInPeriod(thresholdDate);
        int countActiveUsers = activeClients.size();
        String json = new Gson().toJson(countActiveUsers);
        return json;
    }
}
