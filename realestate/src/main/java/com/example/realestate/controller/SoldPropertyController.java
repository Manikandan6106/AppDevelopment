package com.example.realestate.controller;

import com.example.realestate.model.SoldProperty;
import com.example.realestate.service.SoldPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sold-properties")
public class SoldPropertyController {

    @Autowired
    private SoldPropertyService soldPropertyService;

    @GetMapping
    public ResponseEntity<List<SoldProperty>> getAllSoldProperties() {
        try {
            List<SoldProperty> soldProperties = soldPropertyService.getAllSoldProperties();
            return ResponseEntity.ok(soldProperties);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
