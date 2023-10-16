package com.example.phonestation;

import com.example.phonestation.dao.ClientDao;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;


@SpringBootApplication()
@EntityScan("com.example.phonestation.model")
public class PhoneStationApplication {
	public static void main(String[] args) {
		SpringApplication.run(PhoneStationApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ClientDao clientDao){
		return args -> {

		};
	}
}
