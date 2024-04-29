package com.example.graphalgoserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GraphalgoServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GraphalgoServerApplication.class, args);
	}

}
