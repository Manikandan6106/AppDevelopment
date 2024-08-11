package com.example.realestate.service;

import com.example.realestate.model.Contact;
import com.example.realestate.repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }

    public Contact getContactById(Long id) {
        return contactRepo.findById(id).orElse(null);
    }

    public Contact createContact(Contact contact) {
        return contactRepo.save(contact);
    }

    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = contactRepo.findById(id).orElse(null);

        if (contact != null) {
            contact.setName(contactDetails.getName());
            contact.setEmail(contactDetails.getEmail());
            contact.setPhone(contactDetails.getPhone());
            contact.setMessage(contactDetails.getMessage()); // Update the message field
            contact.setTermsAccepted(contactDetails.isTermsAccepted());
            return contactRepo.save(contact);
        }

        return null;
    }

    public void deleteContact(Long id) {
        contactRepo.deleteById(id);
    }
}
