package com.simpsons.backend.service;

import com.simpsons.backend.model.dto.CharacterFilterDTO;
import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CharacterService {

    CharacterResponseDTO create(CharacterRequestDTO dto);

    CharacterResponseDTO findById(Long id);

    Page<CharacterResponseDTO> findAll(CharacterFilterDTO filter, Pageable pageable);

    CharacterResponseDTO update(Long id, CharacterRequestDTO dto);

    void delete(Long id);
}
