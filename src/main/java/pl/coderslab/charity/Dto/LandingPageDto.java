package pl.coderslab.charity.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.charity.Entities.Institution;

import java.util.List;

@Getter @Setter @NoArgsConstructor
public class LandingPageDto {

    private List<Institution> institutions;
    private Long collectedBags;
    private Long supportedOrganisations;

}
