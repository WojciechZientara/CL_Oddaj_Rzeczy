package pl.coderslab.charity.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.Dto.DonationDto;
import pl.coderslab.charity.Dto.FormDto;
import pl.coderslab.charity.Entities.Donation;
import pl.coderslab.charity.Repositories.CategoryRepository;
import pl.coderslab.charity.Repositories.DonationRepository;
import pl.coderslab.charity.Repositories.InstitutionRepository;


@RestController
public class DonationController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    InstitutionRepository institutionRepository;

    @Autowired
    DonationRepository donationRepository;

    @RequestMapping("/getDonationCategories")
    public FormDto getFormDto() {
        FormDto dto = new FormDto();
        dto.setCategories(categoryRepository.findAll());
        dto.setInstitutions(institutionRepository.findAll());
        return dto;
    }

    @PostMapping("/verifyFormData")
    public DonationDto verifyFormData(@RequestBody DonationDto donationDto) {
        //the object is validated in the deserialization process
        return donationDto;
    }

    @PostMapping("/saveDonation")
    public String saveDonation(@RequestBody Donation donation) {

        donationRepository.save(donation);
        return "success";
    }
}
