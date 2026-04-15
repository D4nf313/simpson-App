package com.simpsons.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CharacterFilterDTO {

    private String name;
    private String alias;
    private String occupation;
    private String gender;
    private String family;
    private String firstAppearance;
}
