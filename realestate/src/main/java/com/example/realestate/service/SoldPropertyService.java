package com.example.realestate.service;

import com.example.realestate.model.SoldProperty;
import com.example.realestate.repository.SoldPropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoldPropertyService {

    @Autowired
    private SoldPropertyRepo soldPropertyRepository;

    public List<SoldProperty> getAllSoldProperties() {
        try {
            return soldPropertyRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace(); // Log exception details
            throw new RuntimeException("Error fetching sold properties", e); // Rethrow with a custom message
        }
    }

    public Optional<SoldProperty> getSoldPropertyById(Long id) {
        return soldPropertyRepository.findById(id);
    }

    public SoldProperty saveSoldProperty(SoldProperty soldProperty) {
        return soldPropertyRepository.save(soldProperty);
    }

    public void deleteSoldProperty(Long id) {
        soldPropertyRepository.deleteById(id);
    }
}
