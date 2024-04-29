package com.example.graphalgoserver.cronJob;

import com.example.graphalgoserver.repository.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DatabaseCleanupTask {

    private final HistoryRepository repository;

    @Scheduled(cron = "0 0 0 * * *")
    public void cleanupDatabase() {
        repository.deleteAll();
    }
}
