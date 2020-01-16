package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.charity.Entities.Donation;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT SUM(d.quantity) FROM Donation d")
    Long getNumberOfDonatedBags();

    @Query("SELECT COUNT(DISTINCT d.institution) FROM Donation d")
    Long getNumberOfSupportedOrganisations();

    @Query("SELECT d FROM Donation d WHERE d.id = ?1")
    Donation findDonationById(Long id);

    @Query(value = "SELECT * FROM donations LEFT JOIN users ON donations.user_id = users.id " +
            "WHERE email = ?1 ORDER BY status, pick_up_date, created;", nativeQuery = true)
    List<Donation> getDonationsByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM category_donation WHERE donation_id = ?1", nativeQuery = true)
    void clearCategoryDonationAssociation(long donationId);


}
