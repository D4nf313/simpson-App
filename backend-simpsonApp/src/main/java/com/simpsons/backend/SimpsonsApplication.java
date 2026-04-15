package com.simpsons.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SimpsonsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimpsonsApplication.class, args);
    }
}
