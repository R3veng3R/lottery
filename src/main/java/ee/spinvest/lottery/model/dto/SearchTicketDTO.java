package ee.spinvest.lottery.model.dto;

import ee.spinvest.lottery.model.Ticket;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchTicketDTO {
    private List<Ticket> content;
    private boolean empty;
    private int number;
    private Long totalElements;
    private int totalPages;
}
