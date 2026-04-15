package com.simpsons.backend.service.impl;

import com.simpsons.backend.exception.ResourceNotFoundException;
import com.simpsons.backend.mapper.CharacterMapper;
import com.simpsons.backend.model.dto.CharacterFilterDTO;
import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.model.entity.Character;
import com.simpsons.backend.repository.CharacterRepository;
import com.simpsons.backend.repository.CharacterSpecification;
import com.simpsons.backend.service.CharacterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CharacterServiceImpl implements CharacterService {

    private final CharacterRepository characterRepository;
    private final CharacterMapper characterMapper;

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "charactersList", allEntries = true)
    })
    public CharacterResponseDTO create(CharacterRequestDTO dto) {
        log.info("Creating character: {}", dto.getName());
        Character entity = characterMapper.toEntity(dto);
        Character saved = characterRepository.save(entity);
        return characterMapper.toDto(saved);
    }

    @Override
    @Cacheable(value = "characters", key = "#id")
    public CharacterResponseDTO findById(Long id) {
        log.info("Fetching character with id: {}", id);
        Character character = characterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personaje no encontrado con id: " + id));
        return characterMapper.toDto(character);
    }

    @Override
    @Cacheable(value = "charactersList", key = "#filter.toString() + '_' + #pageable.toString()")
    public Page<CharacterResponseDTO> findAll(CharacterFilterDTO filter, Pageable pageable) {
        log.info("Fetching characters with filters: {} | pageable: {}", filter, pageable);
        Specification<Character> spec = CharacterSpecification.withFilters(filter);
        return characterRepository.findAll(spec, pageable)
                .map(characterMapper::toDto);
    }

    @Override
    @Transactional
    @Caching(
            put = { @CachePut(value = "characters", key = "#id") },
            evict = { @CacheEvict(value = "charactersList", allEntries = true) }
    )
    public CharacterResponseDTO update(Long id, CharacterRequestDTO dto) {
        log.info("Updating character with id: {}", id);
        Character existing = characterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personaje no encontrado con id: " + id));
        characterMapper.updateEntityFromDto(dto, existing);
        Character updated = characterRepository.save(existing);
        return characterMapper.toDto(updated);
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "characters", key = "#id"),
            @CacheEvict(value = "charactersList", allEntries = true)
    })
    public void delete(Long id) {
        log.info("Deleting character with id: {}", id);
        if (!characterRepository.existsById(id)) {
            throw new ResourceNotFoundException("Personaje no encontrado con id: " + id);
        }
        characterRepository.deleteById(id);
    }
}
