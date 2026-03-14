package com.edutech.progressive.service.impl;

import com.edutech.progressive.entity.Match;
import com.edutech.progressive.exception.NoMatchesFoundException;
import com.edutech.progressive.repository.MatchRepository;
import com.edutech.progressive.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class MatchServiceImplJpa implements MatchService {

    
    private MatchRepository matchRepository;

    @Autowired
     public MatchServiceImplJpa(MatchRepository matchRepository ) {
        this.matchRepository=matchRepository;
    }

    @Override
    public List<Match> getAllMatches() throws SQLException {
        return matchRepository.findAll();
    }

    @Override
    public Match getMatchById(int matchId) throws SQLException {
        return matchRepository.findById(matchId).orElse(null);
    }

    @Override
    public Integer addMatch(Match match) throws SQLException {
        Match savedMatch = matchRepository.save(match);
        return savedMatch.getMatchId();
    }

    // Fixes Test 51: Successfully modifies match status
    @Override
    public void updateMatch(Match match) throws SQLException {
        Optional<Match> existingMatch = matchRepository.findById(match.getMatchId());
        if (existingMatch.isPresent()) {
            // Save will perform an update because the ID already exists in DB
            matchRepository.save(match);
        } else {
            throw new SQLException("Match with ID " + match.getMatchId() + " not found");
        }
    }

    @Override
    public void deleteMatch(int matchId) throws SQLException {
        matchRepository.deleteById(matchId);
    }

    @Override
    public List<Match> getAllMatchesByStatus(String status) throws NoMatchesFoundException, SQLException {
        List<Match> matches = matchRepository.findAllByStatus(status);
        if (matches.isEmpty()) {
            throw new NoMatchesFoundException("No matches found with status: " + status);
        }
        return matches;
    }
}
