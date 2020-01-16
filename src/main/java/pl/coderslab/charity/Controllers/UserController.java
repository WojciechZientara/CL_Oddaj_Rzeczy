package pl.coderslab.charity.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.Dto.UserDto;
import pl.coderslab.charity.Entities.Institution;
import pl.coderslab.charity.Entities.User;
import pl.coderslab.charity.Repositories.InstitutionRepository;
import pl.coderslab.charity.Repositories.UserRepository;
import pl.coderslab.charity.Services.JwtUserDetailsService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @PostMapping("/updateUserProfile")
    public void postAdmins(@RequestBody UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail());
        userDto.setId(user.getId());
        userDto.setRoles(user.getRoles());
        jwtUserDetailsService.save(userDto);
    }

}
