export function playBall(striker, bowler, phase, aggressionBoost = 1, riskBoost = 1) {
    let ballOutcome = Math.random() * 100;
    let timing = striker.timing || striker.aggression;
    let power = striker.power || striker.aggression;
    let outChance = 10 - (striker.consistency / 12) + (bowler.bowling / 12);
    let fourchance = 25 + (striker.aggression / 5) - (bowler.economy / 7) + (striker.timing / 10);
    let sixchance = 15 + (striker.aggression / 6) - (bowler.economy / 7) + (striker.power / 10);
    let oneChance = 20;
    let twoChance = 15;
    let dotChance = 12 + (bowler.economy / 5);
    let intentMultiplier = 1;

    striker.momentum = striker.momentum || 0;
    bowler.momentum = bowler.momentum || 0;

    if (phase === "powerplay") {
        outChance -= 5;   // safer
        dotChance -= 5;   // fewer dots
        oneChance += 5;   // more singles
        fourchance += 5;  // some boundaries


        if (bowler.role === "powerplay") {
            outChance += 3;
        }
    }

    else if (phase === "middle") {
        outChance -= 3;
        dotChance += 5;
        oneChance += 10;  // rotate strike more
        fourchance -= 3;  // fewer risky shots


        if (bowler.role === "middle") {
            dotChance += 3;
        }
    }
 

    else if (phase === "death") {
        outChance += 3;
        dotChance += 5;
        oneChance -= 4;  // rotate strike more
        fourchance += 3;
        sixchance += 8;  // fewer risky shots


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

    if (striker.balls > 10) {
        fourchance += 5;
        outChance -= 2;
        sixchance += 6;
    }

    if (phase === "powerplay") intentMultiplier = 1.1;
    if (phase === "middle") intentMultiplier = 0.9;
    if (phase === "death") intentMultiplier = 1.4;

    fourchance *= intentMultiplier;
    sixchance *= intentMultiplier;
    outChance *= intentMultiplier;
    fourchance *= aggressionBoost;
    sixchance *= aggressionBoost;

    outChance *= riskBoost;

    // 🛑 MIN LIMITS
    outChance = Math.max(outChance, 4);
    fourchance = Math.max(fourchance, 4);
    sixchance = Math.max(sixchance, 2);

    fourchance += striker.momentum * 0.5;
    sixchance += striker.momentum * 0.4;
    outChance -= striker.momentum * 0.3;

    outChance += bowler.momentum * 0.5;
    dotChance += bowler.momentum * 0.3;

    let l1 = outChance;
    let l2 = l1 + dotChance;
    let l3 = l2 + oneChance;
    let l4 = l3 + twoChance;
    let l5 = l4 + fourchance;

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


