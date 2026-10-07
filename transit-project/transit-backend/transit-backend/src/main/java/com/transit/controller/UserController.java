package com.transit.controller;

import com.transit.entity.User;
import com.transit.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public User getProfile(@AuthenticationPrincipal UserDetails principal) {
        // principal.getUsername() = email, set by JwtAuthFilter during token validation
        return userService.getByEmail(principal.getUsername());
    }
}
