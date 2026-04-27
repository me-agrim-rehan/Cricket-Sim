import { simulateInnings } from "./matchEngine.js";
export function playMatch(teamA, teamB) {
    console.log("Tossing the coin...");
    console.log("\n match started \n");

    console.log(`Team A batting first: ${teamA.name}`);
    let firstInnings = simulateInnings(teamA, teamB);

    let target = firstInnings.totalRuns + 1;
    console.log(`\nTeam B needs ${target} runs to win.`);

    console.log(`Team B batting second: ${teamB.name}`);
    let secondInnings = simulateInnings(teamB, teamA, target);

    if (secondInnings.totalRuns >= target) {
        console.log(`\n Team B wins by ${secondInnings.totalRuns - target + 1} runs!`);
    } else {
        console.log(`\n Team A wins by ${target - secondInnings.totalRuns - 1} runs!`);
    }
}