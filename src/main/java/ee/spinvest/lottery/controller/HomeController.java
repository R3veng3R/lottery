package ee.spinvest.lottery.controller;

import ee.spinvest.lottery.model.Ticket;
import ee.spinvest.lottery.service.TicketService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

@Controller
public class HomeController {
    private final TicketService ticketService;

    public HomeController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Ticket> tickets = ticketService.findAll();

        model.addAttribute("message", "world!");
        model.addAttribute("tickets", tickets);
        return "layout";
    }

    @PostMapping("/add-ticket")
    public ModelAndView addTicket(@ModelAttribute("ticket") Ticket ticket) {
        ticketService.save(ticket);
        return new ModelAndView("redirect:/");
    }
}
