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

        if (possibleBowlers.length === 0) {
            possibleBowlers = bowlingTeam.filter(p => p.ballsBowled < 24);
        }

        if (possibleBowlers.length === 0) {
            possibleBowlers = bowlingTeam; // emergency fallback
        }

        // remove last bowler
        if (lastBowler && possibleBowlers.length > 1) {
            possibleBowlers = possibleBowlers.filter(p => p !== lastBowler);
        }

        // 🎯 PRIORITY SYSTEM
        possibleBowlers.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;

            // phase preference
            if (a.role === phase) scoreA += 5;
            if (b.role === phase) scoreB += 5;

            // wickets reward
            scoreA += a.wickets * 2;
            scoreB += b.wickets * 2;

            // economy reward (lower is better)
            scoreA += (10 - a.economy);
            scoreB += (10 - b.economy);

            return scoreB - scoreA;
        });

        // pick best (not random anymore)
        let topChoices = possibleBowlers.slice(0, 2);
        let bowler = topChoices[Math.floor(Math.random() * topChoices.length)];
        lastBowler = bowler;

        for (let j = 0; j < 6; j++) {
            if (!striker) break;

            let ballsLeft = (10 - i) * 6 - j;
            let runsNeeded = target ? target - totalRuns : 0;

            let reqRate = target ? runsNeeded / (ballsLeft / 6) : 0;
            let currRate = totalRuns / ((i * 6 + j + 1) / 6);

            let aggressionBoost = 1;
            let riskBoost = 1;

            if (target) {
                if (reqRate > 10) {
                    aggressionBoost = 1.5; // panic hitting
                    riskBoost = 1.4;
                }
                else if (reqRate > 7) {
                    aggressionBoost = 1.25;
                    riskBoost = 1.2;
                }
                else if (reqRate < currRate) {
                    aggressionBoost = 0.9; // chill mode
                    riskBoost = 0.9;
                }
            }

            let result = playBall(striker, bowler, phase, aggressionBoost, riskBoost);
            bowler.ballsBowled++;
            balls.push(result);

            striker.balls++;

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
        let overs = Math.floor(bowler.ballsBowled / 6) + "." + (bowler.ballsBowled % 6);
        let economy = (bowler.runsConceded / (bowler.ballsBowled / 6 || 1)).toFixed(2);

        console.log(
            `${bowler.name} - ${overs} overs | ${bowler.runsConceded} runs | ${bowler.wickets} wickets | Econ: ${economy}`
        );
    });


    return { totalRuns, totalWickets };
}           