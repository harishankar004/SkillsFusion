package com.example.skillsfusion_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Enable CORS integration with WebConfig
                .cors(Customizer.withDefaults())

                // 2. Disable CSRF for stateless REST APIs using JWT
                .csrf(AbstractHttpConfigurer::disable)

                // 3. Configure endpoint permissions
                .authorizeHttpRequests(auth -> auth
                        // Allow browser OPTIONS preflight checks
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        // Explicitly permit public endpoints
                        .requestMatchers("/api/auth/**", "/api/projects/categories").permitAll()

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}