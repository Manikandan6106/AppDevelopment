package com.example.realestate.service;

import com.example.realestate.model.Maintain;
import com.example.realestate.repository.MaintainRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintainService {

    @Autowired
    private MaintainRepo maintainRepo;

    public List<Maintain> getAllRequests() {
        return maintainRepo.findAll();
    }

    public Maintain getRequestById(Long id) {
        return maintainRepo.findById(id).orElse(null);
    }

    public Maintain createRequest(Maintain maintain) {
        return maintainRepo.save(maintain);
    }

    public Maintain updateRequest(Long id, Maintain maintainDetails) {
        Maintain maintain = maintainRepo.findById(id).orElse(null);

        if (maintain != null) {
            maintain.setPropertyName(maintainDetails.getPropertyName());
            maintain.setAddress(maintainDetails.getAddress());
            maintain.setPhoneNumber(maintainDetails.getPhoneNumber());
            maintain.setIssue(maintainDetails.getIssue());
                return maintainRepo.save(maintain);
        }

        return null;
    }

    public void deleteRequest(Long id) {
        maintainRepo.deleteById(id);
    }
}
