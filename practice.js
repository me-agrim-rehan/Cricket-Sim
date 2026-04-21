const TeamA = [{name:"Aru" ,  batting : 85 , aggression:75, consistency:65 , isCaptain:true },
         {name:"raghav" , batting : 92 , aggression:85, consistency:90 , isCaptain:false },
         {name:"divyam" , batting : 83 , aggression:88, consistency:60 , isCaptain:false },
         {name:"arbaz" , batting : 75 , aggression:75, consistency:75 , isCaptain:false },
         {name:"Addy" , batting : 55 , aggression:95, consistency:50 , isCaptain:false }];

         const TeamB = [{name:"mark" ,  batting : 80 , aggression:80, consistency:80 , isCaptain:false },
         {name:"john" , batting : 85 , aggression:85, consistency:85 , isCaptain:false },
         {name:"sid" , batting : 90 , aggression:90, consistency:90 , isCaptain:false },
         {name:"rick" , batting : 95 , aggression:95, consistency:95 , isCaptain:false },
         {name:"root" , batting : 100 , aggression:100, consistency:100 , isCaptain:true }];


function toss() {
    const Prob = Math.random()
    if (Prob > 0.5) {
        return "TeamA";
    }
    else {
        return "TeamB"
    };
}          // task one 

function randomPlayer(team) {
    return team[Math.floor(Math.random() * team.length)];
}

function getCap(team){

    for(let i=0;i<team.length;i++){
    if (team[i].isCaptain){
        return team[i];
    }
}
}   


function chooseTeam(tossResult) {
    if (tossResult === "TeamA") {
        return TeamA;
    }else {
        return TeamB;
    }
}

function decision() {
    const desc = Math.random() * 10;
    if (desc > 5) {
        return "Bat"
    } else {
         return "Bowl"
    };
};     // task two

function tossAndDecision() {
    const tossResult = toss();
    const team = chooseTeam(tossResult);
    const randomPlayerResult = randomPlayer(team);
    const Cap = getCap(team);
     
    return tossResult + " has won the toss!" + "\n" + "Captain : " + Cap.name + " " + "has chosen to " + decision() + " first!";
};  // task 3

function playBall(player) {
    let ballOutcome = Math.random() * 100; 
    let outChance = 15 - (player.consistency / 5);
    let fourchance = 20 + (player.aggression / 5);
    let sixchance = 10 + (player.aggression / 5);
    let oneChance = 25;
    let twoChance = 10; 
    let dotChance = 20;
    
    if(outChance<5){
        outChance=5
    };

    let l1= outChance;
    let l2= l1 + dotChance;
    let l3= l2 + oneChance;
    let l4= l3 + twoChance;
    let l5= l4 + fourchance;
    let l6= l5 + sixchance;

    if(ballOutcome<=l1){
        return  "out"
    }
    else if(ballOutcome<=l2){
        return 0
    }
    else if (ballOutcome<=l3){
        return 1
    }
    else if(ballOutcome<=l4){
        return 2
    }
    else if(ballOutcome<=l5){
        return 4
    }
    else{
        return 6
    }


}

function simulateOver(player) {
    let ball = [];
    let runs = 0;
    let wickets = 0;
    
    for(let i=0; i<6; i++){
        let result = playBall(player);
        ball.push(result);
        console.log("ball" + (i+1) + "=" + result);
        
        if(result === "out"){
            wickets += 1
            if(wickets === 10){
                break;
            }    

        }
        else{
            runs += result;
        }
    }     


    return { runs: runs, wickets: wickets }  ;

}


function simulateInnings(team) {
    let totalRuns = 0;  
    let totalWickets = 0;
    let overs =[];
    let currentBatterIndex = 0;
    let player = team[currentBatterIndex];

    for(let i=0;i<50;i++){
        let overResult = simulateOver(player);
        currentBatterIndex += overResult.wickets;
        if (currentBatterIndex >= team.length) {
            break;
        }
        player = team[currentBatterIndex];
        let summary = "Over " + (i+1) + ": " + overResult.runs + " runs and " + overResult.wickets + " wickets";
        overs.push(summary);
        console.log(summary);
        totalRuns += overResult.runs
        totalWickets += overResult.wickets
        console.log("Score: " + totalRuns + "/" + totalWickets + " Batter on strike: " + (player ? player.name : "all out"));
        if(totalWickets >= team.length - 1){
            break;
        }

    }
    return totalRuns + " runs and " + totalWickets + " wickets "+ "\n" + "Batter on strike: " + (player ? player.name : "all out") + "\n" + "Innings Over!";
}

console.log(simulateInnings(TeamA))                