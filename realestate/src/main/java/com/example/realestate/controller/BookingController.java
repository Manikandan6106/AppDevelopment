package com.example.realestate.controller;

import com.example.realestate.model.Booking;
import com.example.realestate.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/approved")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public List<Booking> getApprovedBookings() {
        return bookingService.getApprovedBookings();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

  @PostMapping("/create")
@PreAuthorize("hasAnyAuthority('USER')")
public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
    Booking createdBooking = bookingService.saveBooking(booking);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking); // Set status to 201 Created
}


    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        if (!bookingService.getBookingById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        booking.setId(id);
        Booking updatedBooking = bookingService.saveBooking(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    @PutMapping("/approve/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Booking> approveBooking(@PathVariable Long id) {
        Optional<Booking> bookingOptional = bookingService.getBookingById(id);
        if (!bookingOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Booking booking = bookingOptional.get();
        booking.setApproved(true);  // Assuming you have an `approved` field in Booking entity
        Booking updatedBooking = bookingService.saveBooking(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (!bookingService.getBookingById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
