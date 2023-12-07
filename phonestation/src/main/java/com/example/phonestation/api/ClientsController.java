package com.example.phonestation.api;

import com.example.phonestation.CustomDateTimeDeserializer;
import com.example.phonestation.CustomDateTimeSerializer;
import com.example.phonestation.model.Client;
import com.example.phonestation.model.PhoneService;
import com.example.phonestation.service.ClientsService;
import com.example.phonestation.service.ClientsServicesService;
import com.example.phonestation.service.PaymentsService;
import com.example.phonestation.service.PhoneServicesService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RequestMapping("")
@RestController
public class ClientsController {
    private final ClientsService clientService;
    private final ClientsServicesService clientsServicesService;
    private final PaymentsService paymentsService;
    private final PhoneServicesService phoneServicesService;
    private Gson gson;
    @Autowired
    public ClientsController(ClientsService clientService, ClientsServicesService clientsServicesService, PaymentsService paymentsService, PhoneServicesService phoneServicesService){

        this.clientService = clientService;
        this.clientsServicesService = clientsServicesService;
        this.paymentsService = paymentsService;
        this.phoneServicesService = phoneServicesService;

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new CustomDateTimeSerializer());
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new CustomDateTimeDeserializer());

        gson = gsonBuilder.setPrettyPrinting().create();
    }

    @GetMapping("/get-all-clients")
    public String getAllClients(){
        List<Client> clients = clientService.getAllClients();
        String json = gson.toJson(clients);
        return json;
    }

    @PostMapping("/get-client")
    public String getClient(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        String clientEmail = obj.getString("clientEmail");

        Client client = clientService.getClient(clientEmail);
        String json = gson.toJson(client);
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
    public void deleteInactiveUsers() throws JSONException {
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
        String json = gson.toJson(countActiveUsers);
        return json;
    }

    @GetMapping("/get-all-clients-with-active-services")
    public String getAllClientsWithActiveServices() {
        List<Client> clients = clientService.getAllClients();
        Map<Client, List<PhoneService>> mapClientServices = new HashMap<>();

        for (Client client : clients) {
            Long clientId = client.getId();
            List<Long> servicesIds = clientsServicesService.getClientActiveServices(clientId);
            List<PhoneService> services = phoneServicesService.getAllServicesByIds(servicesIds);
            mapClientServices.put(client, services);
        }

        String json = gson.toJson(mapClientServices);
        return json;
    }
}
