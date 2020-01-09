package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.Entities.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT SUM(d.quantity) FROM Donation d")
    Long getNumberOfDonatedBags();

    @Query("SELECT COUNT(DISTINCT d.institution) FROM Donation d")
    Long getNumberOfSupportedOrganisations();

}
