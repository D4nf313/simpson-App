package com.simpsons.backend.repository;

import com.simpsons.backend.model.dto.CharacterFilterDTO;
import com.simpsons.backend.model.entity.Character;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CharacterSpecification {

    private CharacterSpecification() {
        // Utility class, no instantiation
    }

    /**
     * Builds a dynamic JPA Specification from a CharacterFilterDTO.
     * All filters are optional — only non-null/non-blank fields are applied.
     */
    public static Specification<Character> withFilters(CharacterFilterDTO filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter == null) {
                return cb.conjunction();
            }

            if (filter.getName() != null && !filter.getName().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"));
            }

            if (filter.getAlias() != null && !filter.getAlias().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("alias")),
                        "%" + filter.getAlias().toLowerCase() + "%"));
            }

            if (filter.getOccupation() != null && !filter.getOccupation().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("occupation")),
                        "%" + filter.getOccupation().toLowerCase() + "%"));
            }

            if (filter.getGender() != null && !filter.getGender().isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("gender")),
                        filter.getGender().toLowerCase()));
            }

            if (filter.getFamily() != null && !filter.getFamily().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("family")),
                        "%" + filter.getFamily().toLowerCase() + "%"));
            }

            if (filter.getFirstAppearance() != null && !filter.getFirstAppearance().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("firstAppearance")),
                        "%" + filter.getFirstAppearance().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
