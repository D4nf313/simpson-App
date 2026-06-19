package com.simpsons.backend.mapper;

import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.model.entity.Character;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-19T10:59:36-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.16 (Eclipse Adoptium)"
)
@Component
public class CharacterMapperImpl implements CharacterMapper {

    @Override
    public Character toEntity(CharacterRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Character.CharacterBuilder character = Character.builder();

        character.name( dto.getName() );
        character.alias( dto.getAlias() );
        character.occupation( dto.getOccupation() );
        character.age( dto.getAge() );
        character.gender( dto.getGender() );
        character.family( dto.getFamily() );
        character.description( dto.getDescription() );
        character.imageUrl( dto.getImageUrl() );
        character.firstAppearance( dto.getFirstAppearance() );

        return character.build();
    }

    @Override
    public CharacterResponseDTO toDto(Character entity) {
        if ( entity == null ) {
            return null;
        }

        CharacterResponseDTO.CharacterResponseDTOBuilder characterResponseDTO = CharacterResponseDTO.builder();

        characterResponseDTO.id( entity.getId() );
        characterResponseDTO.name( entity.getName() );
        characterResponseDTO.alias( entity.getAlias() );
        characterResponseDTO.occupation( entity.getOccupation() );
        characterResponseDTO.age( entity.getAge() );
        characterResponseDTO.gender( entity.getGender() );
        characterResponseDTO.family( entity.getFamily() );
        characterResponseDTO.description( entity.getDescription() );
        characterResponseDTO.imageUrl( entity.getImageUrl() );
        characterResponseDTO.firstAppearance( entity.getFirstAppearance() );
        characterResponseDTO.createdAt( entity.getCreatedAt() );
        characterResponseDTO.updatedAt( entity.getUpdatedAt() );

        return characterResponseDTO.build();
    }

    @Override
    public List<CharacterResponseDTO> toDtoList(List<Character> entities) {
        if ( entities == null ) {
            return null;
        }

        List<CharacterResponseDTO> list = new ArrayList<CharacterResponseDTO>( entities.size() );
        for ( Character character : entities ) {
            list.add( toDto( character ) );
        }

        return list;
    }

    @Override
    public void updateEntityFromDto(CharacterRequestDTO dto, Character entity) {
        if ( dto == null ) {
            return;
        }

        entity.setName( dto.getName() );
        entity.setAlias( dto.getAlias() );
        entity.setOccupation( dto.getOccupation() );
        entity.setAge( dto.getAge() );
        entity.setGender( dto.getGender() );
        entity.setFamily( dto.getFamily() );
        entity.setDescription( dto.getDescription() );
        entity.setImageUrl( dto.getImageUrl() );
        entity.setFirstAppearance( dto.getFirstAppearance() );
    }
}
