package com.edutech.progressive.service.impl;

import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.exception.TeamCricketerLimitExceededException;
import com.edutech.progressive.repository.CricketerRepository;
import com.edutech.progressive.service.CricketerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CricketerServiceImplJpa implements CricketerService {

    @Autowired
    private CricketerRepository cricketerRepository;

    public CricketerServiceImplJpa() {}

    public CricketerServiceImplJpa(CricketerRepository cricketerRepository) {
        this.cricketerRepository = cricketerRepository;
    }

    @Override
    public List<Cricketer> getAllCricketers() throws SQLException {
        return cricketerRepository.findAll();
    }

    @Override
    public Cricketer getCricketerById(int cricketerId) throws SQLException {
        return cricketerRepository.findById(cricketerId).orElse(null);
    }

    @Override
    public Integer addCricketer(Cricketer cricketer) throws TeamCricketerLimitExceededException, SQLException {
        // Null-safe handling for teamId
        Integer teamId = cricketer.getTeamId(); 
        Cricketer saved = cricketerRepository.save(cricketer);
        return saved.getCricketerId();
    }

    @Override
    public void updateCricketer(Cricketer cricketer) throws SQLException {
        if (cricketer.getCricketerId() != null && cricketerRepository.existsById(cricketer.getCricketerId())) {
            cricketerRepository.save(cricketer);
        } else {
            throw new SQLException("Cricketer not found");
        }
    }

    @Override
    public void deleteCricketer(int cricketerId) throws SQLException {
        cricketerRepository.deleteById(cricketerId);
    }

    @Override
    public List<Cricketer> getCricketersByTeam(int teamId) throws SQLException {
        return cricketerRepository.findByTeam_TeamId(teamId);
    }

    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() throws SQLException {
        return cricketerRepository.findAll().stream()
                .sorted() // Uses the compareTo method in Cricketer entity
                .collect(Collectors.toList());
    }
}

