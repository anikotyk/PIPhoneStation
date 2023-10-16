package com.example.phonestation.hibernate;

import com.example.phonestation.model.Client;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class HibernateMain {
    public static void main(String[] args) {
        Configuration configuration = new Configuration().configure();
        configuration.addAnnotatedClass(Client.class);
        StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
        SessionFactory factory = configuration.buildSessionFactory(builder.build());

        Session session = factory.openSession();
        Transaction transaction = session.beginTransaction();
        transaction.commit();
        session.close();
    }
}
