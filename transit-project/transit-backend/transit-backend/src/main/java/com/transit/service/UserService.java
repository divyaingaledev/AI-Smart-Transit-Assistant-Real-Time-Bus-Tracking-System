package com.transit.service;

import com.transit.entity.User;

public interface UserService {
    User getByEmail(String email);
}
