package pl.coderslab.charity.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.charity.Entities.Role;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter @NoArgsConstructor
public class UserDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;

}

