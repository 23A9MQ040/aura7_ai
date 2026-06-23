package ai.aura7.user.controller;

import ai.aura7.user.entity.AuraUser;
import ai.aura7.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<AuraUser> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public AuraUser createUser(@RequestBody AuraUser user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public AuraUser getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
