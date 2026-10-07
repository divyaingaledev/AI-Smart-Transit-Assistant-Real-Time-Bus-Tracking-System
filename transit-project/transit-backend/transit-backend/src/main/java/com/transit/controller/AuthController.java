package com.transit.controller;

import com.transit.dto.request.LoginRequest;
import com.transit.dto.request.RegisterRequest;
import com.transit.dto.response.AuthResponse;
import com.transit.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService; // depends on interface, not impl (Dependency Inversion)

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
