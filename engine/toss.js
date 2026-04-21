import { TeamA, TeamB } from "../models/team.js";


export function toss() {
    const Prob = Math.random()
    if (Prob > 0.5) {
        return "TeamA";
    }
    else {
        return "TeamB"
    };
}          // task one 

export function randomPlayer(team) {
    return team[Math.floor(Math.random() * team.length)];
}

export function getCap(team) {

    for (let i = 0; i < team.length; i++) {
        if (team[i].isCaptain) {
            return team[i];
        }
    }
}


export function chooseTeam(tossResult) {
    if (tossResult === "TeamA") {
        return TeamA;
    } else {
        return TeamB;
    }
}

export function decision() {
    const desc = Math.random() * 10;
    if (desc > 5) {
        return "Bat"
    } else {
        return "Bowl"
    };
};     // task two

export function tossAndDecision() {
    const tossResult = toss();
    const team = chooseTeam(tossResult);
    const randomPlayerResult = randomPlayer(team);
    const Cap = getCap(team);

    return tossResult + " has won the toss!" + "\n" + "Captain : " + Cap.name + " " + "has chosen to " + decision() + " first!";
};  
