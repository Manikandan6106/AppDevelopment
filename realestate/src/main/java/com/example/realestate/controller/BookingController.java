package com.example.realestate.controller;

import com.example.realestate.model.Booking;
import com.example.realestate.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/getAll")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")    
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        if (!bookingService.getBookingById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        booking.setId(id);
        Booking updatedBooking = bookingService.saveBooking(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (!bookingService.getBookingById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
