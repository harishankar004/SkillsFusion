package com.example.skillsfusion_backend.config;

import java.security.Principal;

public class StompPrincipal implements Principal {
    private final String name; // we use the user's email as the principal name
    public StompPrincipal(String name) { this.name = name; }
    @Override public String getName() { return name; }
}