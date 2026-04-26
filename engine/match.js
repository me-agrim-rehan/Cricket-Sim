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
            striker.balls++;

            if (result === "out") {
                totalWickets++;
                striker.isOut = true;

                if (currentIndex < team.length) {
                    striker = team[currentIndex];
                    currentIndex++;
                } else {
                    break;
                }
            } else {
                totalRuns += result;

                striker.runs += result;

                if (result === 1) {
                    let temp = striker;
                    striker = nonStriker;
                    nonStriker = temp;
                }
            }

            console.log(
                `Over ${i + 1}.${j + 1}: ${result} | Runs: ${totalRuns}/${totalWickets} | Batter: ${striker.name}`
            );
        }
        let temp = striker;
        striker = nonStriker;
        nonStriker = temp;

        console.log(`End of Over ${i + 1}: ${balls.join("  ")}`);
    }

    console.log(`\nFinal Score: ${totalRuns}/${totalWickets}`);

    console.log("\n--- Scorecard ---");
    team.forEach(player => {
        console.log(
            `${player.name} - ${player.runs} (${player.balls}) ${player.isOut ? "out" : "not out"}`
        );
    });

    return { totalRuns, totalWickets };
}