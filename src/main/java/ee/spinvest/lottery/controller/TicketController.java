package ee.spinvest.lottery.controller;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.model.dto.SearchTicketDTO;
import ee.spinvest.lottery.service.TicketService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> addTicket(@RequestBody final Ticket ticket) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ticketService.save(ticket));
    }

    @GetMapping(value = "/search", params = { "query", "page", "size"})
    public ResponseEntity<SearchTicketDTO> searchTickets(@RequestParam final String query,
                                                         @RequestParam final int page,
                                                         @RequestParam final int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ticketService.findByQuery(query, page, size));
    }

    @GetMapping(params = {"page", "size"})
    public ResponseEntity<Page<Ticket>> getList(@RequestParam("page") final int page,
                                                @RequestParam("size") final int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ticketService.findAll(page, size));
    }
}
