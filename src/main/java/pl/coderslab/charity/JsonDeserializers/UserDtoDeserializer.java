package pl.coderslab.charity.JsonDeserializers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import pl.coderslab.charity.Dto.UserDto;
import pl.coderslab.charity.Repositories.RoleRepository;
import java.io.IOException;
import java.util.HashSet;

public class UserDtoDeserializer extends JsonDeserializer<UserDto> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public UserDto deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

        ObjectCodec oc = jp.getCodec();
        JsonNode node = oc.readTree(jp);

        UserDto userDto = new UserDto();
        userDto.setRoles(new HashSet<>());

        JsonNode rolesNode = node.get("roles");
        if (rolesNode != null) {
            for (JsonNode role : rolesNode){
                userDto.getRoles().add(roleRepository.findByName(role.asText()));
            }
        }

        if (node.get("id") != null) {
            userDto.setId(node.get("id").asLong());
        }
        if (node.get("firstName") != null) {
            userDto.setFirstName(node.get("firstName").asText());
        }
        if (node.get("lastName") != null) {
            userDto.setLastName(node.get("lastName").asText());
        }
        if (node.get("email") != null) {
            userDto.setEmail(node.get("email").asText());
        }
        if (node.get("password") != null) {
            userDto.setPassword(node.get("password").asText());
        }

        return userDto;

    }

}