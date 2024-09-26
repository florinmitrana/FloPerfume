package com.floperfume.FloPerfume.Controllers;


import com.floperfume.FloPerfume.Classes.ChangePasswordRequest;
import com.floperfume.FloPerfume.Classes.Perfume;
import com.floperfume.FloPerfume.Classes.User;
import com.floperfume.FloPerfume.Services.PerfumeService;
import com.floperfume.FloPerfume.Services.UserService;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PerfumeService perfumeService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {

        return new ResponseEntity<List<User>>(userService.findAllUsers(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getSingleUser(@PathVariable String id) {
        return new ResponseEntity<User>(userService.findUserById(id), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody User newUser) {
        String encryptedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encryptedPassword);
        if (userService.existsByEmail(newUser.getEmail())) {
            return new ResponseEntity<>("Email-ul a fost deja folosit", HttpStatus.BAD_REQUEST);
        }
        if (userService.existsByUsername(newUser.getName())) {
            return new ResponseEntity<>("Username-ul a fost deja folosit", HttpStatus.BAD_REQUEST);
        }
        try {
            User savedUser = userService.saveUser(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("A apărut o eroare.");

        }

    }

    @GetMapping("/{id}/favorites")
    public ResponseEntity<List<Perfume>> getFavouritePerfumes(@PathVariable String id) {
        List<Perfume> favouritePerfumes = userService.findFavouritePerfumesByUserId(id);
        if (favouritePerfumes != null)
            return ResponseEntity.ok(favouritePerfumes);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/favorites")
    public ResponseEntity<String> addFavouritePerfume(@PathVariable String id, @RequestBody Perfume perfume) {
        User user = userService.findUserById(id);

        if (user != null) {
            if (user.getFavouritePerfumes() == null) {
                user.setFavouritePerfumes(new ArrayList<>());
            }

            if (!user.getFavouritePerfumes().contains(perfume)) {
                user.getFavouritePerfumes().add(perfume);
                userService.saveUser(user);
                return ResponseEntity.ok("Parfumul a fost adăugat la favorite.");
            } else {
                return ResponseEntity.badRequest().body("Parfumul este deja în lista de favorite.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}/favorites/{perfumeId}")
    public ResponseEntity<String> removeFavouritePerfume(@PathVariable String id, @PathVariable String perfumeId) {
        User user = userService.findUserById(id);

        if (user != null) {
            System.out.println("User găsit: " + user.getId());
            List<Perfume> favouritePerfumes = user.getFavouritePerfumes();
            System.out.println(favouritePerfumes);

            if (favouritePerfumes != null && !favouritePerfumes.isEmpty()) {
                favouritePerfumes.forEach(perfume -> {
                    if (perfume != null) {
                        System.out.println("Parfum ID: " + perfume.getId());
                    }
                });

                Perfume perfumeToRemove = favouritePerfumes.stream()
                        .filter(perfume -> perfume != null && perfume.getId() != null && perfume.getId().toString().equals(perfumeId))
                        .findFirst()
                        .orElse(null);

                if (perfumeToRemove != null) {
                    favouritePerfumes.remove(perfumeToRemove);
                    user.setFavouritePerfumes(favouritePerfumes);
                    userService.saveUser(user);
                    return ResponseEntity.ok("Parfumul a fost eliminat din favorite.");
                } else {
                    System.out.println("Parfumul cu ID-ul " + perfumeId + " nu a fost găsit în lista de favorite.");
                }
            } else {
                System.out.println("Lista de parfumuri este goală sau nulă.");
            }
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable String id, @RequestBody ChangePasswordRequest changePasswordRequest) {
        User user = userService.findUserById(id);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizatorul nu a fost găsit.");
        }


        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Parola actuală este incorectă.");
        }


        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userService.saveUser(user);

        return ResponseEntity.ok("Parola a fost schimbată cu succes.");
    }

}


