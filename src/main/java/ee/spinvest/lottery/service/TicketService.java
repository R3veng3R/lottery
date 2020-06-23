package ee.spinvest.lottery.service;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TicketService {
    private final Logger log = LoggerFactory.getLogger(TicketService.class);
    private final TicketRepository ticketRepository;
    private final EntityManager entityManager;

    public TicketService(final TicketRepository ticketRepository, final EntityManager entityManager) {
        this.ticketRepository = ticketRepository;
        this.entityManager = entityManager;
    }

    public Ticket save(final Ticket ticket) {
        log.info("Saving ticket with numbers " + ticket.getNumbers());

        if (ticket.getCreated() == null) {
            ticket.setCreated(new Date());
        }

        return ticketRepository.save(ticket);
    }

    @Transactional(readOnly = true)
    public Page<Ticket> findAll(final int page, final int size) {
        final Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.desc("created")));
        return ticketRepository.findAll(pageRequest);
    }

    @Transactional(readOnly = true)
    public List findByQuery(final String query) {
        log.info("Executing search query: " + query);

        final List<String> queryList =
                Stream.of(query.split(" "))
                        .map(String::trim)
                        .collect(Collectors.toList());

        final String params = getQueryString(queryList);
        final Query sqlQuery = entityManager.createQuery(
                TicketRepository.SELECT_TICKET_QUERY + params,
                Ticket.class
        );

        /** TODO: pagination
         * int pageNumber = 1;
         * int pageSize = 10;
         * query.setFirstResult((pageNumber-1) * pageSize);
         * query.setMaxResults(pageSize);
         */

        return sqlQuery.getResultList();
    }

    private String getQueryString(final List<String> queryList) {
        final StringBuilder parameters = new StringBuilder();
        parameters.append(" WHERE ");

        queryList.forEach(keyword ->
                parameters
                        .append("t.numbers LIKE '%")
                        .append(keyword)
                        .append("%' OR ")
        );

        String paramString = parameters.toString();
        paramString = paramString.substring(0, paramString.length() - 4);

        return paramString;
    }
}
