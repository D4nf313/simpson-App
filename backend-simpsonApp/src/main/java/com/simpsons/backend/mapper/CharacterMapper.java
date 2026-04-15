package com.simpsons.backend.mapper;

import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.model.entity.Character;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CharacterMapper {

    Character toEntity(CharacterRequestDTO dto);

    CharacterResponseDTO toDto(Character entity);

    List<CharacterResponseDTO> toDtoList(List<Character> entities);

    /**
     * Updates an existing entity from a DTO (used in PUT operations).
     * MapStruct updates only non-null fields of the target.
     */
    void updateEntityFromDto(CharacterRequestDTO dto, @MappingTarget Character entity);
}
