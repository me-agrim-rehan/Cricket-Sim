import { playBall } from "./ball.js";

export function simulateInnings(battingTeam, bowlingTeam, target) {
    let totalRuns = 0;
    let totalWickets = 0;
    let balls = [];

    let currentIndex = 2;
    let striker = battingTeam[0];
    let nonStriker = battingTeam[1];
    let bowlingindex = 0;

    battingTeam.forEach(p => {
        p.runs = 0;
        p.balls = 0;
        p.isOut = false;
    });

    bowlingTeam.forEach(p => {
        p.runsConceded = 0;
        p.ballsBowled = 0;
        p.wickets = 0;
    });

    let lastBowler = null;

    for (let i = 0; i < 10; i++) {
        balls = [];
        let phase;
        if (i < 2) {
            phase = "powerplay";
        } else if (i < 8) {
            phase = "middle";
        } else {
            phase = "death";
        }

        let possibleBowlers = bowlingTeam.filter(p =>
            p.role === phase && p.ballsBowled < 24
        );

        // fallback if no role match
        if (possibleBowlers.length === 0) {
            possibleBowlers = bowlingTeam.filter(p => p.ballsBowled < 24);
        }

        // remove last bowler (ONLY if alternatives exist)
        if (lastBowler && possibleBowlers.length > 1) {
            possibleBowlers = possibleBowlers.filter(p => p !== lastBowler);
        }

        if (possibleBowlers.length === 0) {
            possibleBowlers = bowlingTeam.filter(p => p !== lastBowler);
        }

        // pick bowler
        let bowler = possibleBowlers[Math.floor(Math.random() * possibleBowlers.length)];
        lastBowler = bowler;
        for (let j = 0; j < 6; j++) {
            if (!striker) break;
            let result = playBall(striker, bowler, phase);
            bowler.ballsBowled++;
            balls.push(result);
            if (striker) striker.balls++;

            if (result === "out") {
                totalWickets++;
                bowler.wickets++;
                striker.isOut = true;

                if (currentIndex < battingTeam.length) {
                    striker = battingTeam[currentIndex];
                    currentIndex++;

                } else {
                    striker = null;
                }

                if (totalWickets >= battingTeam.length - 1) {
                    break;
                }
            } else {
                totalRuns += result;
                bowler.runsConceded += result;
                striker.runs += result;

                if (result % 2 === 1) {
                    let temp = striker;
                    striker = nonStriker;
                    nonStriker = temp;
                }

                if (target && totalRuns >= target) {
                    console.log("Target chased!");
                    return { totalRuns, totalWickets };
                }
            }

            console.log(
                `Over ${i + 1}.${j + 1}: ${result} | Runs: ${totalRuns}/${totalWickets} | Batter: ${striker ? striker.name : "All out"} | Bowler: ${bowler.name}`
            );
        }
        if (totalWickets < battingTeam.length - 1) {
            let temp = striker;
            striker = nonStriker;
            nonStriker = temp;
        }
        if (totalWickets >= battingTeam.length - 1) {
            break;
        };



        console.log(`End of Over ${i + 1}: ${balls.join("  ")} | Runs: ${totalRuns}/${totalWickets}\n`);
    }


    console.log(`\nFinal Score: ${totalRuns}/${totalWickets}`);

    console.log("\n--- Scorecard ---");
    battingTeam.forEach(player => {
        console.log(
            `${player.name} - ${player.runs} (${player.balls}) ${player.isOut ? "out" : "not out"}`
        );
    });


    console.log("\n--- Bowling Stats ---");
    bowlingTeam.forEach(bowler => {
        let overs = (bowler.ballsBowled / 6).toFixed(1);
        let economy = (bowler.runsConceded / (bowler.ballsBowled / 6 || 1)).toFixed(2);

        console.log(
            `${bowler.name} - ${overs} overs | ${bowler.runsConceded} runs | ${bowler.wickets} wickets | Econ: ${economy}`
        );
    });


    return { totalRuns, totalWickets };
}           