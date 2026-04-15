package com.simpsons.backend.controller;

import com.simpsons.backend.model.dto.CharacterFilterDTO;
import com.simpsons.backend.model.dto.CharacterRequestDTO;
import com.simpsons.backend.model.dto.CharacterResponseDTO;
import com.simpsons.backend.service.CharacterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/characters")
@RequiredArgsConstructor
@Tag(name = "Characters", description = "CRUD y búsqueda de personajes de Los Simpsons")
public class CharacterController {

    private final CharacterService characterService;

    // ────────────────────────────── POST ──────────────────────────────

    @PostMapping
    @Operation(summary = "Crear un personaje")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Personaje creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<CharacterResponseDTO> create(
            @Valid @RequestBody CharacterRequestDTO dto) {
        CharacterResponseDTO created = characterService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ────────────────────────────── GET by ID ──────────────────────────────

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un personaje por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Personaje encontrado"),
            @ApiResponse(responseCode = "404", description = "Personaje no encontrado")
    })
    public ResponseEntity<CharacterResponseDTO> findById(
            @PathVariable Long id) {
        return ResponseEntity.ok(characterService.findById(id));
    }

    // ────────────────────────────── GET All (filtros + paginación + orden) ──────────────────────────────

    @GetMapping
    @Operation(summary = "Listar personajes con filtros, paginación y ordenamiento")
    public ResponseEntity<Page<CharacterResponseDTO>> findAll(
            @Parameter(description = "Filtrar por nombre (contains)") @RequestParam(required = false) String name,
            @Parameter(description = "Filtrar por alias (contains)") @RequestParam(required = false) String alias,
            @Parameter(description = "Filtrar por ocupación (contains)") @RequestParam(required = false) String occupation,
            @Parameter(description = "Filtrar por género (exact)") @RequestParam(required = false) String gender,
            @Parameter(description = "Filtrar por familia (contains)") @RequestParam(required = false) String family,
            @Parameter(description = "Filtrar por primera aparición (contains)") @RequestParam(required = false) String firstAppearance,
            @Parameter(description = "Campo para ordenar (name, age, family, etc.)") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Dirección del orden: asc o desc") @RequestParam(defaultValue = "asc") String sortDir,
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size) {

        CharacterFilterDTO filter = CharacterFilterDTO.builder()
                .name(name)
                .alias(alias)
                .occupation(occupation)
                .gender(gender)
                .family(family)
                .firstAppearance(firstAppearance)
                .build();

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok(characterService.findAll(filter, pageable));
    }

    // ────────────────────────────── PUT ──────────────────────────────

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un personaje")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Personaje actualizado"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "404", description = "Personaje no encontrado")
    })
    public ResponseEntity<CharacterResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CharacterRequestDTO dto) {
        return ResponseEntity.ok(characterService.update(id, dto));
    }

    // ────────────────────────────── DELETE ──────────────────────────────

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un personaje")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Personaje eliminado"),
            @ApiResponse(responseCode = "404", description = "Personaje no encontrado")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        characterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
