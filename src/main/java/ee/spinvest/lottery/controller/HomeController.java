package ee.spinvest.lottery.controller;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.service.TicketService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {
    private final TicketService ticketService;

    @Value("${app.version}")
    private String appVersion;

    public HomeController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/old-index")
    public String index(final Model model) {
        final List<Ticket> tickets = ticketService.findAll();

        model.addAttribute("tickets", tickets);
        model.addAttribute("appVersion", appVersion);
        return "layout";
    }
}
