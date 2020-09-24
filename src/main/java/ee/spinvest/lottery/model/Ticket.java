package ee.spinvest.lottery.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    public static final String NUMBER_SEPARATOR = ",";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String numbers;
    private Date created;
}
