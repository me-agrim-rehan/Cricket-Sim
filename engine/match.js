import {playBall} from "./ball.js";

export function simulateInnings(team) {
    let totalRuns = 0;
    let totalWickets = 0;
    let balls = [];
    let currentBatterIndex = 0;
    let player = team[currentBatterIndex];

    for (let i = 0; i < 2; i++) {
        balls = [];
        for (let j = 0; j < 6; j++) {
            let result = playBall(player);
            balls.push(result);
            if (result === "out") {
                totalWickets++;
                currentBatterIndex++;
                if (currentBatterIndex >= team.length - 1 ) {
                    break;
                }
                player = team[currentBatterIndex];
            }
            else {
                totalRuns += result;
            }

            console.log(`Over ${i + 1}.${j + 1}: ${result} |    Runs: ${totalRuns}     |    Wickets: ${totalWickets}    |    Batter: ${player ? player.name : "All out"}   `);
        }
        if (totalWickets >= team.length - 1) {
            break;
        }
        console.log(`End of Over ${i + 1}: ${balls.join("  ")} | Total Runs: ${totalRuns} | Total Wickets: ${totalWickets}`);
    }
    console.log(`Total Runs: ${totalRuns} | Total Wickets: ${totalWickets}`);
    return { totalRuns, totalWickets };
}

