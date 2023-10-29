package com.example.phonestation.api;

import com.example.phonestation.model.PhoneService;
import com.example.phonestation.service.ClientsServicesService;
import com.example.phonestation.service.PhoneServicesService;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("")
@RestController
public class ClientsServicesController {
    private final ClientsServicesService clientsServiceService;
    private final PhoneServicesService phoneServicesService;

    @Autowired
    public ClientsServicesController(ClientsServicesService clientsServiceService, PhoneServicesService phoneServicesService){
        this.clientsServiceService = clientsServiceService;
        this.phoneServicesService = phoneServicesService;
    }

    @PostMapping("/add-service-to-client")
    public void addClientService(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        Long clientId = obj.getLong("clientId");
        Long serviceId = obj.getLong("serviceId");

        clientsServiceService.addClientService(clientId, serviceId);
    }

    @PostMapping("/remove-service-from-client")
    public void removeClientService(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        Long clientId = obj.getLong("clientId");
        Long serviceId = obj.getLong("serviceId");

        clientsServiceService.removeClientService(clientId, serviceId);
    }

    @PostMapping("/get-all-client-active-services")
    public String getAllClientActiveServices(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        Long clientId = obj.getLong("clientId");

        List<Long> servicesIds = clientsServiceService.getClientActiveServices(clientId);
        List<PhoneService> services = phoneServicesService.getAllServicesByIds(servicesIds);

        String json = new Gson().toJson(services);
        return json;
    }
}
