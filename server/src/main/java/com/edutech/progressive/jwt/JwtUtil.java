package com.edutech.progressive.jwt;

import com.edutech.progressive.entity.User;
import com.edutech.progressive.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    // private final String secretString = "secretKey000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    // private Key key;

    // @Autowired
    // private UserRepository userRepository;

    // @PostConstruct
    // public void init() {
    //     this.key = Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));
    // }

    // public String generateToken(String username) {
    //     Map<String, Object> claims = new HashMap<>();
    //     User user = userRepository.findByUsername(username);
    //     if (user != null) {
    //         claims.put("role", user.getRole());
    //     }
    //     return Jwts.builder()
    //             .setClaims(claims)
    //             .setSubject(username)
    //             .setIssuedAt(new Date(System.currentTimeMillis()))
    //             .setExpiration(new Date(System.currentTimeMillis() + 86400000))
    //             .signWith(key, SignatureAlgorithm.HS512)
    //             .compact();
    // }

    // public Claims extractAllClaims(String token) {
    //     try {
    //         return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    //     } catch (Exception e) {
    //         return null;
    //     }
    // }

    // public String extractUsername(String token) {
    //     Claims claims = extractAllClaims(token);
    //     return claims != null ? claims.getSubject() : null;
    // }

    // public boolean isTokenExpired(String token) {
    //     Claims claims = extractAllClaims(token);
    //     return claims == null || claims.getExpiration().before(new Date());
    // }

    // public boolean validateToken(String token, UserDetails userDetails) {
    //     String username = extractUsername(token);
    //     return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    // }

 
    private final String secretString = "secretKey000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    private Key key;

    @Autowired private UserRepository userRepository;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        com.edutech.progressive.entity.User user = userRepository.findByUsername(username);
        if (user != null) claims.put("role", user.getRole());
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (Exception e) { return null; }
    }

    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token);
        return claims != null ? claims.getSubject() : null;
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token);
        return claims == null || claims.getExpiration().before(new Date());
    }
}



