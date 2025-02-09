package com.example.demo.utils;

import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection (only do this if necessary)
                .authorizeHttpRequests(authorize -> authorize

                        /*.requestMatchers("/api/users/login", "/api/users/signup", "/api/users/booking/create").permitAll() // Public endpoints*/
                        .requestMatchers("/api/users/login", "/api/users/signup", "/api/users/top-photographers", "/api/photographer/serviceClass/top-rated", "/api/photographer/serviceClass/{styleName}").permitAll() // Public endpoints
                        .requestMatchers("/api/client/**", "api/ratings/**", "api/bookings/history", "api/bookings/create", "api/bookings/services-to-rate").hasAuthority("CLIENT") // Role-based access
                        .requestMatchers("/api/photographer/serviceClass/create", "/api/photographer/serviceClass/delete/{serviceId}", "/api/users/services", "/api/aws/s3/**", "api/bookings/{id}/cancel", "api/bookings/{id}/confirm", "api/bookings/pending-bookings").hasAuthority("PHOTOGRAPHER") // Role-based access
                        .anyRequest().authenticated() // All other requests need to be authenticated
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();


    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

}