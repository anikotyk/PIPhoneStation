package com.example.phonestation.api;

import com.example.phonestation.model.Payment;
import com.example.phonestation.service.PaymentsService;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("")
@RestController
public class PaymentsController {
    private final PaymentsService paymentService;

    @Autowired
    public PaymentsController(PaymentsService paymentService){
        this.paymentService = paymentService;
    }

    @PostMapping("/add-client-payment")
    public void addPayment(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        Long clientId = obj.getLong("clientId");
        Long serviceId = obj.getLong("serviceId");

        paymentService.addPayment(clientId, serviceId);
    }

    @PostMapping("/get-all-client-payments")
    public String getAllClientPayments(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        Long clientId = obj.getLong("clientId");

        List<Payment> payments = paymentService.getClientPayments(clientId);
        //TODO: format, names instead of ids
        String json = new Gson().toJson(payments);
        return json;
    }

    @PostMapping("/get-all-payments-in-period")
    public String getAllPaymentsInPeriod(@RequestBody String body) throws JSONException {
        JSONObject obj = new JSONObject(body);
        int daysCount = obj.getInt("daysCount");
        LocalDateTime thresholdDate = LocalDateTime.now().minusDays(daysCount);
        List<Payment> payments = paymentService.getAllPaymentsInPeriod(thresholdDate);
        //TODO: format, names instead of ids
        String json = new Gson().toJson(payments);
        return json;
    }
}
