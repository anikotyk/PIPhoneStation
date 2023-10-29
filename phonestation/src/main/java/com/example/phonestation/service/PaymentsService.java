package com.example.phonestation.service;

import com.example.phonestation.dao.PaymentDao;
import com.example.phonestation.model.Payment;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentsService {
    private final PaymentDao paymentDao;

    public PaymentsService(PaymentDao paymentDao){
        this.paymentDao = paymentDao;
    }

    public void addPayment(Long clientId, Long serviceId){
        Payment payment = new Payment(clientId, serviceId);
        paymentDao.save(payment);
    }

    public List<Payment> getAllPaymentsInPeriod(LocalDateTime thresholdDate){
        List<Payment> payments = paymentDao.findAllByDateTimeOfCreationAfter(thresholdDate);
        return payments;
    }

    public List<Payment> getClientPayments(Long clientId){
        List<Payment> payments = paymentDao.findAllByClientId(clientId);
        return payments;
    }

    public void deleteAllClientPayments(Long clientId){
        List<Payment> clientPayments = getClientPayments(clientId);
        for(int i = 0; i < clientPayments.size(); i++){
            paymentDao.delete(clientPayments.get(i));
        }
    }
}

