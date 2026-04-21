import { playBall } from "./ball.js";

export function simulateInnings(team) {
    let totalRuns = 0;
    let totalWickets = 0;
    let balls = [];
    let currentIndex = 2;
    let striker = team[0];
    let nonStriker = team[1];

    for (let i = 0; i < 2; i++) {
        balls = [];
        for (let j = 0; j < 6; j++) {
            let result = playBall(striker);
            balls.push(result);
            if (result === "out") {
                totalWickets++;

                if (currentIndex < team.length) {
                    striker = team[currentIndex];
                    currentIndex++;
                }
                else if (totalWickets >= team.length - 1) {
                    break;
                }
            }
            else {
                totalRuns += result;

                if (result === 1 ) {
                    let temp = striker;
                    striker = nonStriker;
                    nonStriker = temp;
                }
            }
            console.log(`Over ${i + 1}.${j + 1}: ${result} |    Runs: ${totalRuns}     |    Wickets: ${totalWickets}    |    Batter: ${striker ? striker.name : "All out"}   `);
        }
        if (totalWickets < team.length - 1) {
            let temp = striker;
            striker = nonStriker;
            nonStriker = temp;
        }

        console.log(`End of Over ${i + 1}: ${balls.join("  ")} | Total Runs: ${totalRuns} | Total Wickets: ${totalWickets}`);

    }
    console.log(`Total Runs: ${totalRuns} | Total Wickets: ${totalWickets}`);
    return { totalRuns, totalWickets };
}





