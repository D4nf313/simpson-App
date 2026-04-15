package com.simpsons.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Los Simpsons - Characters API")
                        .version("1.0.0")
                        .description("REST API para la gestión de personajes de Los Simpsons")
                        .contact(new Contact()
                                .name("Simpsons Backend")
                                .email("dev@simpsons.com")));
    }
}
