package ee.spinvest.lottery.controller;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    private TicketService ticketService;

    public TicketController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public Ticket addTicket(@RequestBody final Ticket ticket) {
        return ticketService.save(ticket);
    }

    @GetMapping("/{query}")
    public List<Ticket> searchTickets(@PathVariable final String query) {
        return ticketService.findByQuery(query);
    }
}
