package com.example.lms.auth;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final Map<String, User> users = new HashMap<>();

    public UserService() {
        // Tài khoản DEV mẫu:
        users.put("admin@example.com",
                new User("admin@example.com", "Admin@123", "ADMIN", "Quản trị hệ thống"));

        users.put("tutor@example.com",
                new User("tutor@example.com", "Tutor@123", "TUTOR", "Nguyễn Văn A"));

        users.put("mentee@example.com",
                new User("mentee@example.com", "Mentee@123", "MENTEE", "Trần Thị B"));
    }

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }
}
