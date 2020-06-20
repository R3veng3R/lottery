package ee.spinvest.lottery.service;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TicketService {
    private TicketRepository ticketRepository;
    private EntityManager entityManager;

    public TicketService(final TicketRepository ticketRepository, final EntityManager entityManager) {
        this.ticketRepository = ticketRepository;
        this.entityManager = entityManager;
    }

    public Ticket save(final Ticket ticket) {
        if (ticket.getCreated() == null) {
            ticket.setCreated(new Date());
        }

        return ticketRepository.save(ticket);
    }

    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    public List<Ticket> findByQuery(final String query) {
        List<String> queryList =
                Stream.of(query.split(" "))
                        .map(String::trim)
                        .collect(Collectors.toList());

        StringBuilder parameters = new StringBuilder();
        for (String keyword : queryList ) {
            parameters
                    .append("t.numbers LIKE '%")
                    .append(keyword)
                    .append("%' OR ");
        }

        String paramString = parameters.toString();
        paramString = paramString.substring(0, paramString.length() - 4);

        return entityManager.createQuery(
                TicketRepository.SELECT_TICKET_QUERY + paramString,
                Ticket.class
        ).getResultList();
    }
}
