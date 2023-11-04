package com.example.phonestation.api;

import com.example.phonestation.model.PhoneService;
import com.example.phonestation.service.ClientsServicesService;
import com.example.phonestation.service.PhoneServicesService;
import com.google.gson.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RequestMapping("")
@RestController
public class ClientsServicesController {
    private final ClientsServicesService clientsServiceService;
    private final PhoneServicesService phoneServicesService;
    private Gson gson;
    @Autowired
    public ClientsServicesController(ClientsServicesService clientsServiceService, PhoneServicesService phoneServicesService){
        this.clientsServiceService = clientsServiceService;
        this.phoneServicesService = phoneServicesService;

        gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
            @Override
            public LocalDateTime deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
                Instant instant = Instant.ofEpochMilli(json.getAsJsonPrimitive().getAsLong());
                return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
            }
        }).create();
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

        String json = gson.toJson(services);
        return json;
    }
}
