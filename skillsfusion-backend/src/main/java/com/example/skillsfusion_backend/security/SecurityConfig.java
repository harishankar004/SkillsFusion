package com.example.skillsfusion_backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Integrates Spring Security with your WebConfig CORS configuration
                .cors(Customizer.withDefaults())

                // 2. Disable CSRF for stateless REST APIs using JWT/Tokens
                .csrf(csrf -> csrf.disable())

                // 3. Configure endpoint permissions
                .authorizeHttpRequests(auth -> auth
                        // Allow browser OPTIONS preflight requests to pass without authentication
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        // Allow public access to auth endpoints and public categories
                        .requestMatchers("/api/auth/**", "/api/projects/categories").permitAll()

                        // Secure all remaining endpoints
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}