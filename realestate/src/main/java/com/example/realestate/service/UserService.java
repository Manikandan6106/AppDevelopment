package com.example.realestate.service;

import com.example.realestate.model.User;
import com.example.realestate.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
    
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepo.findById(id).orElse(null);

        if (user != null) {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            return userRepo.save(user);
        }

        return null;
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
