export function playBall(batsman, bowler, phase) {
    let ballOutcome = Math.random() * 100;
    let timing = batsman.timing || batsman.aggression;
    let power = batsman.power || batsman.aggression;
    let outChance = 15 - (batsman.consistency / 10) + (bowler.bowling / 10);
    let fourchance = 20 + (batsman.aggression / 5) - (bowler.economy / 7) + (batsman.timing / 10);
    let sixchance = 10 + (batsman.aggression / 6) - (bowler.economy / 7) + (batsman.power / 10);
    let oneChance = 25;
    let twoChance = 10;
    let dotChance = 20 + (bowler.economy / 5);

        if (phase === "powerplay") {
        outChance += 3;
        fourchance += 3;

        if (bowler.role === "powerplay") {
            outChance += 3;
        }
    }

    else if (phase === "middle") {
        outChance -= 3;
        dotChance += 5;
        oneChance += 5;

        if (bowler.role === "middle") {
            dotChance += 3;
        }
    }

    else if (phase === "death") {
        sixchance += 10;
        fourchance += 5;
        outChance += 7;
        dotChance -= 5;

        if (bowler.role === "death") {
            outChance += 3;
        }
    }

    if (outChance < 5) {
        outChance = 5
    };
    if (fourchance < 5) {
        fourchance = 5
    };
    if (sixchance < 3) {
        sixchance = 3
    };

    let l1 = outChance;
    let l2 = l1 + dotChance;
    let l3 = l2 + oneChance;
    let l4 = l3 + twoChance;
    let l5 = l4 + fourchance;
    let l6 = l5 + sixchance;

    if (ballOutcome <= l1) {
        return "out"
    }
    else if (ballOutcome <= l2) {
        return 0
    }
    else if (ballOutcome <= l3) {
        return 1
    }
    else if (ballOutcome <= l4) {
        return 2
    }
    else if (ballOutcome <= l5) {
        return 4
    }
    else {
        return 6
    }


}      
   