package com.floperfume.FloPerfume.Services;


import com.floperfume.FloPerfume.Classes.Perfume;
import com.floperfume.FloPerfume.Classes.User;
import com.floperfume.FloPerfume.Repositories.PerfumeRepository;
import com.floperfume.FloPerfume.Repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PerfumeRepository perfumeRepository;

    public List<User> findAllUsers(){ return userRepository.findAll();}
    public User findUserById(String id){return userRepository.findUserById(id);}

    public User findUserByName(String name){return userRepository.findUserByName(name);}
    public User findUserByEmail(String email){return userRepository.findUserByEmail(email);}
    public boolean existsByEmail(String email) { return userRepository.findUserByEmail(email) != null; }
    public boolean existsByUsername(String username) { return userRepository.findUserByName(username) != null;}

    public List<Perfume> findFavouritePerfumesByUserId(String id){
        User user = userRepository.findUserById(id);
        if (user != null && user.getFavouritePerfumes() != null) {
            return user.getFavouritePerfumes().stream()
                    .map(favourite -> {
                        if (favourite.getId() != null) {
                            ObjectId perfumeId = new ObjectId(favourite.getId());
                            Perfume perfume = perfumeRepository.findById(perfumeId).orElse(null);
                            if (perfume != null) {

                                perfume.setId(favourite.getId());
                            }
                            return perfume;
                        }
                        return null;
                    })
                    .filter(perfume -> perfume != null)
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Transactional
    public User saveUser(User user) {
        User existingUser = userRepository.findUserByEmail(user.getEmail());

        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setPassword(user.getPassword());
            existingUser.setFavouritePerfumes(user.getFavouritePerfumes());
            return userRepository.save(existingUser);
        } else {
            user.setId(new ObjectId().toHexString());
            return userRepository.save(user);
        }
    }
}
