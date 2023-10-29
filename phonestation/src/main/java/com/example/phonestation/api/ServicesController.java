package com.example.phonestation.api;

import com.example.phonestation.model.PhoneService;
import com.example.phonestation.service.ClientsServicesService;
import com.example.phonestation.service.PaymentsService;
import com.example.phonestation.service.PhoneServicesService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("")
@RestController
public class ServicesController {
    private final PhoneServicesService phoneServicesService;
    @Autowired
    public ServicesController(PhoneServicesService serviceService, ClientsServicesService clientsServicesService,  PaymentsService paymentsService){
        this.phoneServicesService = serviceService;
    }

    @GetMapping("/get-all-services")
    public List<PhoneService> getAllServices(){
        return phoneServicesService.getAllActiveServices();
    }

    @PostMapping("/add-service")
    public void addService(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        long price = obj.getLong("price");
        String name = obj.getString("name");
        String description = obj.getString("description");
        Boolean isTariff = obj.getBoolean("isTariff");
        phoneServicesService.addPhoneService(price, name, description, isTariff);
    }

    @PostMapping("/delete-service")
    public void deleteService(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        long serviceId = obj.getLong("serviceId");
        phoneServicesService.deletePhoneService(serviceId);
    }

    @PostMapping("/edit-service")
    public void editService(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        long serviceId = obj.getLong("serviceId");
        long price = obj.getLong("price");
        String name = obj.getString("name");
        String description = obj.getString("description");
        Boolean isTariff = obj.getBoolean("isTariff");
        phoneServicesService.editPhoneService(serviceId, price, name, description, isTariff);
    }
}
