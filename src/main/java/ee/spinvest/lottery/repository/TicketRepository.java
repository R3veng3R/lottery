package ee.spinvest.lottery.repository;

import ee.spinvest.lottery.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    String SELECT_TICKET_QUERY = "SELECT t FROM Ticket t";
    String COUNT_TICKET_QUERY = "SELECT COUNT(t.id) FROM Ticket t";

    Optional<Ticket> findById(Long id);
    Page<Ticket> findAll(Pageable pageRequest);
}
