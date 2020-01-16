package pl.coderslab.charity.Services;

import org.springframework.security.core.GrantedAuthority;
import pl.coderslab.charity.Dto.UserDto;
import pl.coderslab.charity.Entities.Role;
import pl.coderslab.charity.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.coderslab.charity.Repositories.RoleRepository;
import pl.coderslab.charity.Repositories.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }

        List<GrantedAuthority> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(role);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                roles);
    }

    public User save(UserDto userDto) {
        User user = new User();
        if (userDto.getId() != null && userDto.getId() > 0) {
            user.setId(userDto.getId());
        }
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        Set<Role> roles = new HashSet<>();
        if (userDto.getRoles() != null) {
            roles = userDto.getRoles();
        } else {
            roles.add(roleRepository.findByName("ROLE_USER"));
        }
        user.setRoles(roles);
        user.setPassword(bcryptEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }
}
