package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.Entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.email = ?1")
    User findByEmail(String email);

    @Query(value = "SELECT * FROM users LEFT JOIN role_user ON users.id = role_user.user_id WHERE role_id = 2 ORDER BY id;", nativeQuery = true)
    List<User> findAdmins();

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.id = ?1")
    User findUserById(Long id);
}
