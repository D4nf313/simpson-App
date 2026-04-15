package com.simpsons.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.service.CharacterService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CharacterController.class)
class CharacterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CharacterService characterService;

    @Autowired
    private ObjectMapper objectMapper;

    private CharacterResponseDTO buildResponseDTO() {
        return CharacterResponseDTO.builder()
                .id(1L)
                .name("Bart Simpson")
                .family("Simpson")
                .age(10)
                .gender("Male")
                .occupation("Student")
                .build();
    }

    @Test
    @DisplayName("POST /api/v1/characters → 201 Created")
    void create_shouldReturn201() throws Exception {
        CharacterRequestDTO req = CharacterRequestDTO.builder()
                .name("Bart Simpson").age(10).family("Simpson").gender("Male").build();
        CharacterResponseDTO resp = buildResponseDTO();

        when(characterService.create(any())).thenReturn(resp);

        mockMvc.perform(post("/api/v1/characters")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Bart Simpson"));
    }

    @Test
    @DisplayName("GET /api/v1/characters/{id} → 200 OK")
    void findById_shouldReturn200() throws Exception {
        when(characterService.findById(1L)).thenReturn(buildResponseDTO());

        mockMvc.perform(get("/api/v1/characters/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Bart Simpson"));
    }

    @Test
    @DisplayName("GET /api/v1/characters → 200 OK with page")
    void findAll_shouldReturnPage() throws Exception {
        Page<CharacterResponseDTO> page = new PageImpl<>(List.of(buildResponseDTO()));
        when(characterService.findAll(any(), any())).thenReturn(page);

        mockMvc.perform(get("/api/v1/characters")
                        .param("family", "Simpson")
                        .param("sortBy", "name")
                        .param("sortDir", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Bart Simpson"));
    }

    @Test
    @DisplayName("PUT /api/v1/characters/{id} → 200 OK")
    void update_shouldReturn200() throws Exception {
        CharacterRequestDTO req = CharacterRequestDTO.builder()
                .name("Bart J. Simpson").age(11).build();
        CharacterResponseDTO resp = CharacterResponseDTO.builder()
                .id(1L).name("Bart J. Simpson").build();

        when(characterService.update(eq(1L), any())).thenReturn(resp);

        mockMvc.perform(put("/api/v1/characters/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Bart J. Simpson"));
    }

    @Test
    @DisplayName("DELETE /api/v1/characters/{id} → 204 No Content")
    void delete_shouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/v1/characters/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("POST /api/v1/characters with blank name → 400 Bad Request")
    void create_withInvalidData_shouldReturn400() throws Exception {
        CharacterRequestDTO invalid = CharacterRequestDTO.builder().name("").build();

        mockMvc.perform(post("/api/v1/characters")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }
}
