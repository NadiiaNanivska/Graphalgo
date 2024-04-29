package com.example.graphalgoserver.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "history")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
//
//    @Column(name = "action_time")
//    private LocalDateTime actionTime;

    @Enumerated(EnumType.STRING)
    private AlgorithmType algorithm;

    @Column(name = "start_vertices")
    private String startVertices;

    @Column(name = "result_vertices")
    private String resultVertices;
}
