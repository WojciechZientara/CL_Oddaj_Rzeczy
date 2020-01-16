package pl.coderslab.charity.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.Dto.DonationDto;
import pl.coderslab.charity.Dto.FormDto;
import pl.coderslab.charity.Dto.UserDto;
import pl.coderslab.charity.Entities.Donation;
import pl.coderslab.charity.Entities.Institution;
import pl.coderslab.charity.Entities.User;
import pl.coderslab.charity.Repositories.CategoryRepository;
import pl.coderslab.charity.Repositories.DonationRepository;
import pl.coderslab.charity.Repositories.InstitutionRepository;
import pl.coderslab.charity.Repositories.UserRepository;
import pl.coderslab.charity.Services.JwtUserDetailsService;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @GetMapping("/getInstitutions")
    public List<Institution> getInstitutions() {
        return institutionRepository.findAll();
    }

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/getAdmins")
    public List<User> getAdmins() {
        return userRepository.findAdmins();
    }

    @GetMapping("/getOneOfInstitutions/{id}")
    public Institution getInstitutions(@PathVariable Long id) {
        return institutionRepository.findInstitutionById(id);
    }

    @GetMapping("/getOneOfUsers/{id}")
    public User getUsers(@PathVariable Long id) {
        return userRepository.findUserById(id);
    }

    @GetMapping("/getOneOfAdmins/{id}")
    public User getAdmins(@PathVariable Long id) {
        return userRepository.findUserById(id);
    }

    @PostMapping("/postInstitutions")
    public void postInstitutions(@RequestBody Institution institution) {
        institutionRepository.save(institution);
    }

    @PostMapping("/postUsers")
    public void postUsers(@RequestBody UserDto userDto) {
        jwtUserDetailsService.save(userDto);
    }

    @PostMapping("/postAdmins")
    public void postAdmins(@RequestBody UserDto userDto) {
        jwtUserDetailsService.save(userDto);
    }

    @GetMapping("/deleteInstitutions/{id}")
    public void deleteInstitutions(@PathVariable Long id) {
        institutionRepository.deleteById(id);
    }

    @GetMapping("/deleteUsers/{id}")
    public void deleteUsers(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/deleteAdmins/{id}")
    public void deleteAdmins(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
