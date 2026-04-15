package com.simpsons.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CharacterResponseDTO {

    private Long id;
    private String name;
    private String alias;
    private String occupation;
    private Integer age;
    private String gender;
    private String family;
    private String description;
    private String imageUrl;
    private String firstAppearance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
