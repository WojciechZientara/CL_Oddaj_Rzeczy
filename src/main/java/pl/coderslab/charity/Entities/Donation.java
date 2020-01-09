package pl.coderslab.charity.Entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(min = 1)
    private long quantity;

    @ManyToMany
    @JoinTable(
        name="category_donation",
        joinColumns=@JoinColumn(name="donation_id"),
        inverseJoinColumns=@JoinColumn(name="category_id")
    )
    private List<Category> categories;

    @ManyToOne
    private Institution institution;

    @NotBlank
    private String street;

    @NotBlank
    private String city;

    @Pattern(regexp = "\\d{2}-\\d{3}")
    private String zipCode;

    private LocalDate pickUpDate;

    private LocalTime pickUpTime;

    @Column(columnDefinition = "TEXT")
    private String pickUpComment;

}
