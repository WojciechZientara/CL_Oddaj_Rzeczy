package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.coderslab.charity.Entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

}
