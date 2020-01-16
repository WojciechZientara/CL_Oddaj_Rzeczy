package pl.coderslab.charity.JsonDeserializers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import pl.coderslab.charity.Dto.DonationDto;
import pl.coderslab.charity.Entities.Donation;
import pl.coderslab.charity.Repositories.CategoryRepository;
import pl.coderslab.charity.Repositories.InstitutionRepository;
import pl.coderslab.charity.Repositories.UserRepository;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

public class DonationDeserializer extends JsonDeserializer<Donation> {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Donation deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

        ObjectCodec oc = jp.getCodec();
        JsonNode node = oc.readTree(jp);

        Donation donation = new Donation();
        donation.setCategories(new ArrayList<>());

        JsonNode categoriesNode = node.get("categories");
        for (JsonNode category : categoriesNode){
            donation.getCategories().add(categoryRepository.findCategoryById(category.asLong()));
        }

            donation.setQuantity(node.get("quantity").asLong());
            donation.setInstitution(institutionRepository.findInstitutionById(node.get("institution").asLong()));
            donation.setStreet(node.get("street").toString().replaceAll("\"", ""));
            donation.setCity(node.get("city").toString().replaceAll("\"", ""));
            donation.setZipCode(node.get("zipCode").toString().replaceAll("\"", ""));
            donation.setPhone(node.get("phone").toString().replaceAll("\"", ""));
            donation.setPickUpDate(LocalDate.parse(node.get("pickUpDate").toString().replaceAll("\"", "")));
            donation.setPickUpTime(LocalTime.parse(node.get("pickUpTime").toString().replaceAll("\"", "")));
            donation.setPickUpComment(node.get("pickUpComment").toString().replaceAll("\"", ""));
            if (donation.getPickUpComment().equals("") || donation.getPickUpComment() == null) {
                donation.setPickUpComment("Brak");
            }
            Long userId = node.get("user").get("id").asLong();
            donation.setUser(userRepository.findUserById(userId));

        return donation;

    }

}