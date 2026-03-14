package com.edutech.progressive.service.impl;

import com.edutech.progressive.entity.Vote;
import com.edutech.progressive.repository.VoteRepository;
import com.edutech.progressive.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public VoteServiceImpl() {
    }

    public VoteServiceImpl(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    @Override
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    @Override
    public int createVote(Vote vote) {
        if (vote.getTeam() != null) {
            // Only check the ID if the Team object is NOT null
            if (vote.getTeam().getTeamId() == null || vote.getTeam().getTeamId() <= 0) {
                vote.setTeam(null);
            }
        }

        // 2. Safe check for Cricketer (This fixes your error)
        if (vote.getCricketer() != null) {
            // Only check the ID if the Cricketer object is NOT null
            if (vote.getCricketer().getCricketerId() == null || vote.getCricketer().getCricketerId() <= 0) {
                vote.setCricketer(null);
            }
        }

        Vote saved = voteRepository.save(vote);
        return saved.getVoteId();
        // Vote saved = voteRepository.save(vote);
        // return saved.getVoteId();
    }

    @Override
    public Map<String, Long> getVotesCountOfAllCategories() {
        Map<String, Long> counts = new LinkedHashMap<>();
        counts.put("Team", safeCount("Team"));
        counts.put("Batsman", safeCount("Batsman"));
        counts.put("Bowler", safeCount("Bowler"));
        counts.put("All-rounder", safeCount("All-rounder"));
        counts.put("Wicketkeeper", safeCount("Wicketkeeper"));
        return counts;
    }

    private long safeCount(String category) {
        Long value = voteRepository.countByCategory(category);
        return value == null ? 0L : value;
    }
}