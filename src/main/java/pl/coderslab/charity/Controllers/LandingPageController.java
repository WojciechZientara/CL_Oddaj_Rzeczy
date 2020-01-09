package pl.coderslab.charity.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.coderslab.charity.Dto.LandingPageDto;
import pl.coderslab.charity.Repositories.DonationRepository;
import pl.coderslab.charity.Repositories.InstitutionRepository;


@RestController
public class LandingPageController {

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    DonationRepository donationRepository;


    @RequestMapping("/getLandingPageDto")
    public LandingPageDto getLandingPageDto(){
        LandingPageDto dto = new LandingPageDto();
        dto.setInstitutions(institutionRepository.findAll());
        Long numberOfDonatedBags = donationRepository.getNumberOfDonatedBags();
        if (numberOfDonatedBags == null) {
            numberOfDonatedBags = 0L;
        }
        Long numberOfSupportedOrganisations = donationRepository.getNumberOfSupportedOrganisations();
        if (numberOfSupportedOrganisations == null) {
            numberOfSupportedOrganisations = 0L;
        }

        dto.setCollectedBags(numberOfDonatedBags);
        dto.setSupportedOrganisations(numberOfSupportedOrganisations);
        return dto;
    }
}
