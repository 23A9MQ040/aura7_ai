package ai.aura7.agentcore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/agents")
@CrossOrigin(origins = "*")
public class AgentController {

    @GetMapping
    public List<Map<String, Object>> getAgents() {
        List<Map<String, Object>> agents = new ArrayList<>();
        
        agents.add(createAgent("core-1", "Orchestrator Agent", "active", "Routing tasks and managing context.", 98.5, "#00f0ff"));
        agents.add(createAgent("learn-1", "Learning Agent", "learning", "Analyzing curriculum paths.", 85.0, "#10b981"));
        agents.add(createAgent("career-1", "Career Agent", "idle", "Waiting for resume upload.", 100.0, "#a855f7"));
        agents.add(createAgent("privacy-1", "Privacy Guardian", "protected", "Scrubbing PII from logs.", 99.9, "#ec4899"));
        
        return agents;
    }

    private Map<String, Object> createAgent(String id, String name, String status, String lastAction, double accuracy, String color) {
        Map<String, Object> agent = new HashMap<>();
        agent.put("id", id);
        agent.put("name", name);
        agent.put("status", status);
        agent.put("lastAction", lastAction);
        agent.put("accuracy", accuracy);
        agent.put("color", color);
        return agent;
    }
}
