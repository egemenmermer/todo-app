package com.ego.todoapp.business.service.Impl;

import com.ego.todoapp.business.dto.LoginRequestDto;
import com.ego.todoapp.business.dto.LoginResponseDto;
import com.ego.todoapp.business.service.AuthService;
import com.ego.todoapp.data.entity.UserEntity;
import com.ego.todoapp.data.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Autowired
    private  UserRepository userRepository;

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        //Test
        System.out.println("Email: " + loginRequestDto.getEmail() + " Password: " + loginRequestDto.getPassword());

        UserEntity user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        System.out.println(user.getPassword() + " " + user.getEmail());

        if (!user.getPassword().equals(loginRequestDto.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return new LoginResponseDto("Login successful!");
    }


}
