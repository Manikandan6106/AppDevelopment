package com.example.realestate.repository;

import com.example.realestate.model.SoldProperty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoldPropertyRepo extends JpaRepository<SoldProperty, Long> {
    
}
