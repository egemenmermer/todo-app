package com.ego.todoapp.business.service;

import com.ego.todoapp.business.dto.LoginRequestDto;
import com.ego.todoapp.business.dto.LoginResponseDto;

public interface AuthService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);
}
