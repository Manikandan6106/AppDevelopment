package com.example.realestate.repository;

import com.example.realestate.model.Maintain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintainRepo extends JpaRepository<Maintain, Long> {
 
}
