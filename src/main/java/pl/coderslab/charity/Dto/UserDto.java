package pl.coderslab.charity.Dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.charity.Entities.Role;
import pl.coderslab.charity.JsonDeserializers.DonationDtoDeserializer;
import pl.coderslab.charity.JsonDeserializers.UserDtoDeserializer;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter @NoArgsConstructor
@JsonDeserialize(using = UserDtoDeserializer.class)
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Set<Role> roles;

}

