package pl.coderslab.charity.Dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.charity.Entities.Category;
import pl.coderslab.charity.Entities.Donation;
import pl.coderslab.charity.Entities.Institution;
import pl.coderslab.charity.JsonDeserializers.DonationDtoDeserializer;

import java.util.Map;
import java.util.Set;

@Getter @Setter @NoArgsConstructor
@JsonDeserialize(using = DonationDtoDeserializer.class)
public class DonationDto {

    private Donation donation;
    private Set<String> errors;

}
