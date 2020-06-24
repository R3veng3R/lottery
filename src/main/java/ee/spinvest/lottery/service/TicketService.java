package ee.spinvest.lottery.service;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.model.dto.SearchTicketDTO;
import ee.spinvest.lottery.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TicketService {
    private final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;
    private final EntityManager entityManager;
    private final FileService fileService;


    public TicketService(final TicketRepository ticketRepository,
                         final EntityManager entityManager,
                         final FileService fileService) {
        this.ticketRepository = ticketRepository;
        this.entityManager = entityManager;
        this.fileService = fileService;
    }

    @Transactional
    public Ticket save(final Ticket ticket) {
        if (ticket.getCreated() == null) {
            ticket.setCreated(new Date());
        }

        return ticketRepository.saveAndFlush(ticket);
    }

    @Transactional(readOnly = true)
    public Page<Ticket> findAll(final int page, final int size) {
        final Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.desc("created")));
        return ticketRepository.findAll(pageRequest);
    }

    @Transactional(readOnly = true)
    public SearchTicketDTO findByQuery(final String query, final int page, final int size) {
        log.info("Executing search query: " + query + " page: " + page + " size: " + size);

        final List<String> queryList =
                Stream.of(query.split(" "))
                        .map(String::trim)
                        .collect(Collectors.toList());

        final String params = getQueryString(queryList);
        final String order = " ORDER BY t.created DESC";
        final TypedQuery<Ticket> sqlQuery = entityManager.createQuery(
                TicketRepository.SELECT_TICKET_QUERY + params + order,
                Ticket.class
        );

        sqlQuery.setFirstResult(page * size);
        sqlQuery.setMaxResults(size);
        final List<Ticket> result = sqlQuery.getResultList();

        final TypedQuery<Long> countQuery = entityManager.createQuery(
                TicketRepository.COUNT_TICKET_QUERY + params,
                Long.class
        );

        final long countResult = countQuery.getSingleResult();
        final int totalPages = (int) ((countResult / size) + 1);

        return SearchTicketDTO.builder()
                .content(result)
                .empty(result.size() == 0)
                .number(page + 1)
                .totalElements(countResult)
                .totalPages(totalPages)
                .build();
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

    @Transactional
    public boolean uploadFile(final MultipartFile file) {
        log.info("Received uploaded file: " + file.getOriginalFilename());

        if (!file.isEmpty()) {
            boolean tmpDirExists = fileService.createUploadTmpDir();
            if (!tmpDirExists) return false;

            boolean isFileSaved = fileService.saveFileToTmpDir(file);
            if (!isFileSaved) return false;


            final Path filePath = Paths.get(fileService.getUploadTmpFolder() + File.separator + file.getOriginalFilename());
            try (Stream<String> stream = Files.lines(filePath)) {

                stream.forEach(line -> {
                    if (!ticketRepository.existsByNumbers(line)) {
                        this.save(Ticket.builder()
                                .numbers(line)
                                .created(new Date())
                                .build()
                        );
                    }
                });

                Files.deleteIfExists(filePath);

            } catch (IOException e) {
                log.error("ERROR 002: Unable to read or write file to DB");
                e.printStackTrace();
                return false;
            }

        }

        return true;
    }

    @Transactional
    public boolean truncateData() {
        ticketRepository.deleteAll();
        return true;
    }
}
