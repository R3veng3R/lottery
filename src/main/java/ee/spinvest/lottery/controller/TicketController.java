package ee.spinvest.lottery.controller;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.service.TicketService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{query}")
    public ResponseEntity<List> searchTickets(@PathVariable final String query) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ticketService.findByQuery(query));
    }

    @GetMapping(params = { "page", "size" })
    public ResponseEntity<Page<Ticket>> getList(@RequestParam("page") final int page,
                                                @RequestParam("size") final int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ticketService.findAll(page, size));
    }
}
