// function comments() {
//     // console.log(TeamA);
//     // console.log(TeamB); // day 2 task 1

//     // for ( let i = 0 ; i < TeamA.length ; i++){
//     //     console.log(TeamA[i]);
//     // }  //day 2 task 2

// }



// const TeamA = ["player1", "player2", "player3", "player4", "player5"];
// const TeamB = ["player_a", "player_b", "player_c", "player_d", "player_e"];


// function toss() {
//     const Prob = Math.random()
//     if (Prob > 0.5) {
//         return "TeamA";
//     }
//     else {
//         return "TeamB"
//     };
// }          // task one 



// function randomPlayer(team) {
//     return team[Math.floor(Math.random() * team.length)];
// }

// function chooseTeam(tossResult) {
//     if (tossResult === "TeamA") {
//         return TeamA;
//     }else {
//         return TeamB;
//     }
// }

// function decision() {
//     const desc = Math.random() * 10;
//     if (desc > 5) {
//         return "Bat"
//     } else {
//          return "Bowl"
//     };
// };     // task two

// function tossAndDecision() {
//     const tossResult = toss();
//     const randomPlayerResult = randomPlayer(chooseTeam(tossResult));

//     return tossResult + " has won the toss!" + "\n" + "Random player : " + randomPlayerResult + " " + "has chosen to " + decision() + " first!";
// };  // task 3

// console.log(tossAndDecision()); //final result    



const Players = [{name:"Aru" ,  batting : 85 , aggression:75, consistency:65 }
];

console.log(Players[0].name);
console.log(Players[0].batting);// task 1 day 3

