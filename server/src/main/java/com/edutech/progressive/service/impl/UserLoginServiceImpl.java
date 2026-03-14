package com.edutech.progressive.service.impl;

import com.edutech.progressive.entity.User;
import com.edutech.progressive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserLoginServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired(required = false)
    private PasswordEncoder passwordEncoder;

    // This will now work perfectly because we added @EnableGlobalMethodSecurity to
    // config
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public User createUser(User user) {
        if (passwordEncoder != null && user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // @Override
    // public UserDetails loadUserByUsername(String username) throws
    // UsernameNotFoundException {
    // User user = userRepository.findByUsername(username);
    // if (user == null) {
    // throw new UsernameNotFoundException("User not found with username: " +
    // username);
    // }

    // // Fix: Properly map the role with the ROLE_ prefix for Spring Security
    // String roleWithPrefix = user.getRole().startsWith("ROLE_") ?
    // user.getRole() : "ROLE_" + user.getRole();

    // return new org.springframework.security.core.userdetails.User(
    // user.getUsername(),
    // user.getPassword(),
    // Collections.singletonList(new SimpleGrantedAuthority(roleWithPrefix))
    // );
    // }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("User not found");
        // Ensure this logic is present!
        String role = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" + user.getRole();
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role)));

        // Prefixing is vital for hasRole("ADMIN") to work!
        // String role = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" +
        // user.getRole();

        // return new org.springframework.security.core.userdetails.User(
        // user.getUsername(),
        // user.getPassword(),
        // Collections.singletonList(new SimpleGrantedAuthority(role)));
    }

}
