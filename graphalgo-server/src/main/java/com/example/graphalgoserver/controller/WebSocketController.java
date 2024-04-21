package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.shareGraph.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.StompSubProtocolHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate template;

    private Map<String, StompSubProtocolHandler> sessions = new ConcurrentHashMap<>();

    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        StompSubProtocolHandler session = (StompSubProtocolHandler) event.getSource();
        sessions.put(session.toString(), session);
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompSubProtocolHandler session = (StompSubProtocolHandler) event.getSource();
        sessions.remove(session.toString());
    }

    @MessageMapping("/chat.invite")
    @SendTo("/topic/public")
    public void inviteToChat(@RequestBody Message msg) {
        this.template.convertAndSend("/topic/public/" + msg.recipientId, msg.data);

    }
}
