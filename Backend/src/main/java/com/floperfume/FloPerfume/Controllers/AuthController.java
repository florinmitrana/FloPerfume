package com.floperfume.FloPerfume.Controllers;

import com.floperfume.FloPerfume.Classes.LogInRequest;
import com.floperfume.FloPerfume.Classes.User;
import com.floperfume.FloPerfume.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.net.PasswordAuthentication;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LogInRequest loginRequest, HttpSession session){
        User user = userService.findUserByEmail(loginRequest.getEmail());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(null);
        }
        session.setAttribute("user", user);

        return ResponseEntity.ok(user);
    }
    @GetMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        // Invalidăm sesiunea utilizatorului
        session.invalidate();
        return ResponseEntity.ok("Deconectare reușită");
    }

}

