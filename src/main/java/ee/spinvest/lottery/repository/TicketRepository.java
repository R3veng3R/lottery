package ee.spinvest.lottery.repository;

import ee.spinvest.lottery.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    String SELECT_TICKET_QUERY = "SELECT t FROM Ticket t";
    Optional<Ticket> findById(Long id);
}
