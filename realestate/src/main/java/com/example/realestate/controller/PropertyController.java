package com.example.realestate.controller;

import com.example.realestate.model.Property;
import com.example.realestate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public ResponseEntity<List<Property>> getAllProperties() {
    try {
        List<Property> properties = propertyService.getAllProperties();
        if (properties == null || properties.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(properties, HttpStatus.OK);
    } catch (Exception e) {
        // Log the exception to get more details
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property savedProperty = propertyService.saveProperty(property);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Optional<Property> existingProperty = propertyService.getPropertyById(id);
        if (!existingProperty.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        property.setId(id);
        Property updatedProperty = propertyService.saveProperty(property);
        return new ResponseEntity<>(updatedProperty, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        if (!property.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        propertyService.deleteProperty(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
