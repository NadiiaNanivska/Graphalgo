package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.shareGraph.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/chat.invite")
    public void inviteToChat(@RequestBody Message msg) {
        this.template.convertAndSend("/topic/public/" + msg.recipientId, msg.data);

    }
}
