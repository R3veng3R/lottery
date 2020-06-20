package ee.spinvest.lottery.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.net.URI;


@Service
public class AppService {
    private final Logger log = LoggerFactory.getLogger(AppService.class);
    private static final String UI_URL = "http://localhost:8080/";

    @EventListener(ApplicationReadyEvent.class)
    public void openBrowser() {
        log.info("Launching browser on " + UI_URL);
        System.setProperty("java.awt.headless", "false");
        Desktop desktop = Desktop.getDesktop();
        try {
            desktop.browse(new URI(UI_URL));
        } catch (Exception e) {
            log.info("Unable to launch browser");
        }
    }
}
