package com.example.lms.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return userService.findByUsername(username)
                .map(user -> {
                    if (user.getPassword().equals(password)) {
                        // token fake cho DEV (không phải JWT)
                        String token = "dev-token-" + UUID.randomUUID();

                        return ResponseEntity.ok(Map.of(
                                "token", token,
                                "role", user.getRole(),
                                "name", user.getName(),
                                "username", user.getUsername()
                        ));
                    } else {
                        return ResponseEntity.status(401).body(Map.of(
                                "error", "Sai mật khẩu"
                        ));
                    }
                })
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of(
                        "error", "Tài khoản không tồn tại"
                )));
    }
}
