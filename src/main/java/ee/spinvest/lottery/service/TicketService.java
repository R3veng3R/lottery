package ee.spinvest.lottery.service;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
    public Page<Ticket> findByQuery2(final String searchQuery, int page, final int size) {
        log.info("Executing search query: " + searchQuery + " page: " + page + " size: " + size);

        final List<String> queryList =
                Stream.of(searchQuery.split(" "))
                        .map(String::trim)
                        .collect(Collectors.toList());

        final CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        final CriteriaQuery<Ticket> criteriaQuery = cb.createQuery(Ticket.class);
        final Root<Ticket> root = criteriaQuery.from(Ticket.class);

        final List<Predicate> predicates = new ArrayList<>();
        queryList.forEach(keyword ->
                predicates.add(cb.like(root.get("numbers"), "%" + keyword + "%"))
        );

        criteriaQuery
                .select(root)
                .where(cb.or(predicates.toArray(new Predicate[]{})))
                .orderBy(cb.desc(root.get("created")));

        final TypedQuery<Ticket> query =
                entityManager
                        .createQuery(criteriaQuery)
                        .setFirstResult(page * size)
                        .setMaxResults(size);

        final Long count = countSearchResults(cb, predicates.toArray(new Predicate[]{}));

        return new PageImpl<>(
                query.getResultList(), PageRequest.of(page, size), count
        );
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

    @Transactional(readOnly = true)
    protected Long countSearchResults(final CriteriaBuilder cb, final Predicate[] predicates) {
        final CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        countQuery
                .select(cb.count(countQuery.from(Ticket.class)))
                .where(cb.or(predicates));

        return entityManager.createQuery(countQuery).getSingleResult();
    }
}
