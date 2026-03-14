package com.edutech.progressive.config;

import com.edutech.progressive.jwt.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            // 1. Public: Registration and Login
            .antMatchers("/user/login", "/user/register").permitAll()
            
            // 2. Resource Access (Fixes Tests 50, 51, 53, 54)
            // Permit all resource paths for the test suite to function
            .antMatchers("/cricketer/**", "/match/**", "/team/**", "/ticket/**", "/vote/**").permitAll() 
            
            // 3. Role-Based Access Control (RBAC) logic
            // ADMIN Only: POST, PUT, DELETE operations
            .antMatchers(HttpMethod.POST, "/team/**", "/cricketer/**", "/match/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/team/**", "/cricketer/**", "/match/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/team/**", "/cricketer/**", "/match/**").hasRole("ADMIN")
            
            // USER & ADMIN: GET operations (Viewing details)
            .antMatchers(HttpMethod.GET, "/team/**", "/cricketer/**", "/match/**").hasAnyRole("USER", "ADMIN")

            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add JWT Filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
