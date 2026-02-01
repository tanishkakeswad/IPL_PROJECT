package com.edutech.progressive.controller;

import com.edutech.progressive.entity.TicketBooking;
import com.edutech.progressive.service.impl.TicketBookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketBookingController {

    @Autowired
    private TicketBookingServiceImpl ticketBookingService;

    @GetMapping
    public ResponseEntity<List<TicketBooking>> getAllBookings() {
        try {
            return ResponseEntity.ok(ticketBookingService.getAllTicketBookings());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Integer> createBooking(@RequestBody TicketBooking ticketBooking) {
        try {
            int id = ticketBookingService.createBooking(ticketBooking);
            return ResponseEntity.status(201).body(id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable int bookingId) {
        try {
            ticketBookingService.cancelBooking(bookingId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<TicketBooking>> getBookingsByUserEmail(@PathVariable String email) {
        try {
            return ResponseEntity.ok(ticketBookingService.getBookingsByUserEmail(email));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
