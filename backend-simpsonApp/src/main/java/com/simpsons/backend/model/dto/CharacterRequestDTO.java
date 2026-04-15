package com.simpsons.backend.model.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CharacterRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
    private String name;

    @Size(max = 100, message = "El alias no puede superar 100 caracteres")
    private String alias;

    @Size(max = 100, message = "La ocupación no puede superar 100 caracteres")
    private String occupation;

    @Min(value = 0, message = "La edad no puede ser negativa")
    @Max(value = 150, message = "La edad no puede superar 150")
    private Integer age;

    @Size(max = 20)
    private String gender;

    @Size(max = 100)
    private String family;

    private String description;

    private String imageUrl;

    @Size(max = 100)
    private String firstAppearance;
}
