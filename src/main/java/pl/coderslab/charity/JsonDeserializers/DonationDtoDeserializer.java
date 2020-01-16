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
import java.util.*;
import java.util.regex.Pattern;

public class DonationDtoDeserializer extends JsonDeserializer<DonationDto> {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public DonationDto deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

        ObjectCodec oc = jp.getCodec();
        JsonNode node = oc.readTree(jp);

        DonationDto dto = new DonationDto();
        Donation donation = new Donation();
        donation.setCategories(new ArrayList<>());
        Set<String> errors = new HashSet<>();

        JsonNode categoriesNode = node.get("categories");
        for (JsonNode category : categoriesNode){
            donation.getCategories().add(categoryRepository.findCategoryById(category.asLong()));
        }
        if (donation.getCategories().size() == 0) {
            errors.add("categories");
        }

        try {
            donation.setQuantity(node.get("quantity").asLong());
            if (donation.getQuantity() < 1) {
                throw new Exception();
            }
        } catch (Exception e) {
            errors.add("quantity");
        }

        try {
            donation.setInstitution(institutionRepository.findInstitutionById(node.get("institution").asLong()));
        } catch (Exception e) {
            errors.add("institution");
        }

        try {
            donation.setStreet(node.get("street").toString().replaceAll("\"", ""));
            if (donation.getStreet().equals("") || donation.getStreet() == null) {
                throw new Exception();
            }
        } catch (Exception e) {
            errors.add("street");
        }

        try {
            donation.setCity(node.get("city").toString().replaceAll("\"", ""));
            if (donation.getCity().equals("") || donation.getCity() == null) {
                throw new Exception();
            }
        } catch (Exception e) {
            errors.add("city");
        }

        try {
            donation.setZipCode(node.get("zipCode").toString().replaceAll("\"", ""));
            if (donation.getZipCode() == "" || donation.getZipCode() == null) {
                throw new Exception();
            }
            if (!Pattern.matches("\\d{2}-\\d{3}", donation.getZipCode())) {
                throw new Exception();
            }

        } catch (Exception e) {
            errors.add("zipCode");
        }

        try {
            donation.setPhone(node.get("phone").toString().replaceAll("\"", ""));
            if (donation.getPhone() == "" || donation.getPhone() == null) {
                throw new Exception();
            }
            if (!Pattern.matches("\\+48\\d{9}", donation.getPhone())) {
                throw new Exception();
            }

        } catch (Exception e) {
            errors.add("phone");
        }

        try {
            donation.setPickUpDate(LocalDate.parse(node.get("pickUpDate").toString().replaceAll("\"", "")));
        } catch (Exception e) {
            errors.add("pickUpDate");
        }

        try {
            donation.setPickUpTime(LocalTime.parse(node.get("pickUpTime").toString().replaceAll("\"", "")));
        } catch (Exception e) {
            errors.add("pickUpTime");
        }

        donation.setPickUpComment(node.get("pickUpComment").toString().replaceAll("\"", ""));
        if (donation.getPickUpComment().equals("") || donation.getPickUpComment() == null) {
            donation.setPickUpComment("Brak");
        }

        String userEmail = node.get("userEmail").toString().replaceAll("\"", "");
        donation.setUser(userRepository.findByEmail(userEmail));
        dto.setDonation(donation);
        dto.setErrors(errors);
        return dto;

    }

}