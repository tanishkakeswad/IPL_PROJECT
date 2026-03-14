package com.edutech.progressive.controller;

import com.edutech.progressive.dto.LoginRequest;
import com.edutech.progressive.dto.LoginResponse;
import com.edutech.progressive.entity.User;
import com.edutech.progressive.jwt.JwtUtil;
import com.edutech.progressive.service.impl.UserLoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserLoginController {

    @Autowired
    private UserLoginServiceImpl userLoginService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User created = userLoginService.createUser(user);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            // Returns 409 Conflict if user already exists
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Authenticate using Spring Security's Manager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), 
                        loginRequest.getPassword()
                    )
            );
            
            // 2. If successful, generate the JWT
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            
            // 3. Fetch user details for the response
            User user = userLoginService.getUserByUsername(loginRequest.getUsername());
            
            // 4. Create the standardized response
            LoginResponse response = new LoginResponse(
                token, 
                user != null ? user.getRole() : null, 
                user != null ? user.getUserId() : null
            );
            
            return ResponseEntity.ok(response);
            
        } catch (AuthenticationException e) {
            // Returns 401 Unauthorized if password or username is wrong
            return ResponseEntity.status(401).build();
        }
    }
}
