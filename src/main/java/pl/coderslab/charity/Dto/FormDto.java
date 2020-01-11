package pl.coderslab.charity.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.charity.Entities.Category;
import pl.coderslab.charity.Entities.Institution;

import java.util.List;

@Getter @Setter @NoArgsConstructor
public class FormDto {

    private List<Category> categories;
    private List<Institution> institutions;

}
