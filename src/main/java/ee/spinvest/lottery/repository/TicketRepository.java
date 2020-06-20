package ee.spinvest.lottery.repository;

import ee.spinvest.lottery.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    public static final String SELECT_TICKET_QUERY = "SELECT t FROM Ticket t WHERE ";

    List<Ticket> findByNumbers(String number);
    Optional<Ticket> findById(Long id);
    List<Ticket> findAllByNumbersIn(Set<String> numbers);

}
