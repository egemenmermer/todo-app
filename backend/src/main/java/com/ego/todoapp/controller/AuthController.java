package com.ego.todoapp.controller;

import com.ego.todoapp.business.dto.LoginRequestDto;
import com.ego.todoapp.business.dto.LoginResponseDto;
import com.ego.todoapp.business.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private  AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        System.out.println("email;"+loginRequest.getEmail() + " " +loginRequest.getPassword());
        LoginResponseDto response = authService.login(loginRequest);
        return ResponseEntity.ok(response);

    }
}