package com.example.realestate.controller;

import com.example.realestate.model.Maintain;
import com.example.realestate.service.MaintainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintain")
public class MaintainController {

    @Autowired
    private MaintainService maintainService;

    @GetMapping("/getAll")
    public List<Maintain> getAllRequests() {
        return maintainService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Maintain> getRequestById(@PathVariable Long id) {
        Maintain maintain = maintainService.getRequestById(id);
        if (maintain != null) {
            return ResponseEntity.ok(maintain);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Maintain> createRequest(@RequestBody Maintain maintain) {
        Maintain savedMaintain = maintainService.createRequest(maintain);
        return new ResponseEntity<>(savedMaintain, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Maintain> updateRequest(@PathVariable Long id, @RequestBody Maintain maintainDetails) {
        Maintain updatedMaintain = maintainService.updateRequest(id, maintainDetails);
        if (updatedMaintain != null) {
            return ResponseEntity.ok(updatedMaintain);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        maintainService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
