package com.edutech.progressive.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Integer voteId;

    @Column(name = "email")
    private String email;

    @Column(name = "category")
    private String category;

    @ManyToOne
    @JoinColumn(name = "cricketer_id")
    @JsonIgnoreProperties("voteList")
    private Cricketer cricketer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    @JsonIgnoreProperties("votes")
    private Team team;

    public Vote() {
    }

    public Vote(Integer voteId, String email, String category, Cricketer cricketer, Team team) {
        this.voteId = voteId;
        this.email = email;
        this.category = category;
        this.cricketer = cricketer;
        this.team = team;
    }

    public Integer getVoteId() {
        return voteId;
    }

    public void setVoteId(Integer voteId) {
        this.voteId = voteId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Cricketer getCricketer() {
        return cricketer;
    }

    public void setCricketer(Cricketer cricketer) {
        this.cricketer = cricketer;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}