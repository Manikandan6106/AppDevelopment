package com.example.realestate.controller;

import com.example.realestate.model.Property;
import com.example.realestate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/getAll")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Property createProperty(@RequestBody Property property) {
        return propertyService.saveProperty(property);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        if (!propertyService.getPropertyById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        property.setId(id);
        Property updatedProperty = propertyService.saveProperty(property);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        if (!propertyService.getPropertyById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}
