package pl.coderslab.charity.Entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import pl.coderslab.charity.JsonDeserializers.DonationDeserializer;
import pl.coderslab.charity.JsonDeserializers.DonationDtoDeserializer;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "donations")
@JsonDeserialize(using = DonationDeserializer.class)
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Min(1)
    private long quantity;

    @ManyToMany
    @JoinTable(
        name="category_donation",
        joinColumns=@JoinColumn(name="donation_id"),
        inverseJoinColumns=@JoinColumn(name="category_id")
    )
    private List<Category> categories;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Institution institution;

    @NotBlank
    private String street;

    @NotBlank
    private String city;

    @Pattern(regexp = "\\d{2}-\\d{3}")
    private String zipCode;

    @NotBlank
    private String phone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUpDate;

    private LocalTime pickUpTime;

    @Column(columnDefinition = "TEXT")
    private String pickUpComment;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private User user;

    private String status;

    private LocalDateTime created;

    @PrePersist
    public void prePersist() {
        created = LocalDateTime.now();
    }

}
