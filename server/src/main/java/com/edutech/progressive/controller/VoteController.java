package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Vote;
import com.edutech.progressive.service.impl.VoteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vote")
public class VoteController {

    @Autowired
    private VoteServiceImpl voteService;

    @GetMapping
    public ResponseEntity<List<Vote>> getAllVotes() {
       List<Vote> votes = voteService.getAllVotes();
    // Return an empty list [] instead of null to avoid 500 errors
    return ResponseEntity.ok(votes == null ? new ArrayList<>() : votes);
       // return ResponseEntity.ok(voteService.getAllVotes());
    }

    @PostMapping
    public ResponseEntity<Integer> createVote(@RequestBody Vote vote) {
        int id = voteService.createVote(vote);
        return ResponseEntity.status(201).body(id);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getVotesCountOfAllCategories() {
        return ResponseEntity.ok(voteService.getVotesCountOfAllCategories());
    }
}
