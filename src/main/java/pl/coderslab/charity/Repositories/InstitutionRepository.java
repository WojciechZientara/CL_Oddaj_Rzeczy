package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.coderslab.charity.Entities.Institution;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
}
