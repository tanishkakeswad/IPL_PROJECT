export class Vote {
    voteId?: number;
    email: string;
    category: string;
    cricketerId: number;
    teamId: number;

    constructor(
        email: string,
        category: string,
        cricketerId: number,
        teamId: number,
        voteId?: number
    ) {
        this.voteId = voteId;
        this.email = email;
        this.category = category;
        this.cricketerId = cricketerId;
        this.teamId = teamId;
    }
}

