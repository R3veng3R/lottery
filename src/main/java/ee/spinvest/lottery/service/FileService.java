package ee.spinvest.lottery.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {
    private final Logger log = LoggerFactory.getLogger(FileService.class);

    public boolean createUploadTmpDir() {
        final Path uploadPath = Paths.get( getUploadTmpFolder() );

        if (Files.notExists(uploadPath)) {
            try {
                log.info("Creating new temp folder: " + getUploadTmpFolder());
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                log.error("ERROR 001: Unable to create upload temp folder!");
                e.printStackTrace();
                return false;
            }
        }

        return true;
    }

    public boolean saveFileToTmpDir(MultipartFile file) {
        try {
            file.transferTo(Paths.get(getUploadTmpFolder() + File.separator + file.getOriginalFilename()));
        } catch (IOException e) {
            log.error("ERROR 003: Unable to save file to tmp dir");
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public String getUploadTmpFolder() {
        return System.getProperty("user.home") + File.separator + "lottery" + File.separator + "upload";
    }

}
