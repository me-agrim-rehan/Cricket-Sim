export function playBall(player, bowler) {
    let ballOutcome = Math.random() * 100;
    let outChance = 15 - (player.consistency / 5);
    let fourchance = 20 + (player.aggression / 5);
    let sixchance = 10 + (player.aggression / 5);
    let oneChance = 25;
    let twoChance = 10;
    let dotChance = 20;

    if (outChance < 5) {
        outChance = 5
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
