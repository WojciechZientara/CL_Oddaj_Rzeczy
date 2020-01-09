package pl.coderslab.charity.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.coderslab.charity.Entities.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {
}
