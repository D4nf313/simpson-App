package com.simpsons.backend.service;

import com.simpsons.backend.exception.ResourceNotFoundException;
import com.simpsons.backend.mapper.CharacterMapper;
import com.simpsons.backend.model.dto.CharacterFilterDTO;
import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.model.entity.Character;
import com.simpsons.backend.repository.CharacterRepository;
import com.simpsons.backend.service.impl.CharacterServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CharacterServiceImplTest {

    @Mock
    private CharacterRepository characterRepository;

    @Mock
    private CharacterMapper characterMapper;

    @InjectMocks
    private CharacterServiceImpl characterService;

    private Character character;
    private CharacterRequestDTO requestDTO;
    private CharacterResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        character = Character.builder()
                .id(1L)
                .name("Homer Simpson")
                .family("Simpson")
                .age(39)
                .gender("Male")
                .occupation("Nuclear Safety Inspector")
                .build();

        requestDTO = CharacterRequestDTO.builder()
                .name("Homer Simpson")
                .family("Simpson")
                .age(39)
                .gender("Male")
                .occupation("Nuclear Safety Inspector")
                .build();

        responseDTO = CharacterResponseDTO.builder()
                .id(1L)
                .name("Homer Simpson")
                .family("Simpson")
                .age(39)
                .gender("Male")
                .occupation("Nuclear Safety Inspector")
                .build();
    }

    @Test
    @DisplayName("create() should persist character and return DTO")
    void create_shouldSaveAndReturnDto() {
        when(characterMapper.toEntity(requestDTO)).thenReturn(character);
        when(characterRepository.save(character)).thenReturn(character);
        when(characterMapper.toDto(character)).thenReturn(responseDTO);

        CharacterResponseDTO result = characterService.create(requestDTO);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Homer Simpson");
        verify(characterRepository, times(1)).save(character);
    }

    @Test
    @DisplayName("findById() should return DTO when character exists")
    void findById_shouldReturnDto_whenExists() {
        when(characterRepository.findById(1L)).thenReturn(Optional.of(character));
        when(characterMapper.toDto(character)).thenReturn(responseDTO);

        CharacterResponseDTO result = characterService.findById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("findById() should throw ResourceNotFoundException when not found")
    void findById_shouldThrow_whenNotFound() {
        when(characterRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> characterService.findById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    @DisplayName("findAll() should return paginated results")
    void findAll_shouldReturnPage() {
        Page<Character> page = new PageImpl<>(List.of(character));
        when(characterRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
        when(characterMapper.toDto(character)).thenReturn(responseDTO);

        Page<CharacterResponseDTO> result = characterService.findAll(
                CharacterFilterDTO.builder().family("Simpson").build(),
                PageRequest.of(0, 10));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getFamily()).isEqualTo("Simpson");
    }

    @Test
    @DisplayName("update() should update fields and return updated DTO")
    void update_shouldUpdateAndReturnDto() {
        CharacterRequestDTO updateDto = CharacterRequestDTO.builder()
                .name("Homer J. Simpson").age(40).build();
        CharacterResponseDTO updatedResponse = CharacterResponseDTO.builder()
                .id(1L).name("Homer J. Simpson").age(40).build();

        when(characterRepository.findById(1L)).thenReturn(Optional.of(character));
        doNothing().when(characterMapper).updateEntityFromDto(updateDto, character);
        when(characterRepository.save(character)).thenReturn(character);
        when(characterMapper.toDto(character)).thenReturn(updatedResponse);

        CharacterResponseDTO result = characterService.update(1L, updateDto);

        assertThat(result.getName()).isEqualTo("Homer J. Simpson");
        verify(characterMapper).updateEntityFromDto(updateDto, character);
    }

    @Test
    @DisplayName("delete() should remove character when found")
    void delete_shouldDeleteWhenFound() {
        when(characterRepository.existsById(1L)).thenReturn(true);
        doNothing().when(characterRepository).deleteById(1L);

        assertThatCode(() -> characterService.delete(1L)).doesNotThrowAnyException();
        verify(characterRepository).deleteById(1L);
    }

    @Test
    @DisplayName("delete() should throw when character not found")
    void delete_shouldThrow_whenNotFound() {
        when(characterRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> characterService.delete(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
