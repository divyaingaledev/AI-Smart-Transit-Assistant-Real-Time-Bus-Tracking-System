package com.transit.service;

import com.transit.dto.request.LoginRequest;
import com.transit.dto.request.RegisterRequest;
import com.transit.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
