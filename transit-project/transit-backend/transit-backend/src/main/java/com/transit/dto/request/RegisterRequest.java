package com.transit.dto.request;

import com.transit.entity.User;

// Data the client sends to register a new user
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private User.Role role;   // PASSENGER, DRIVER, or ADMIN

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }
}
