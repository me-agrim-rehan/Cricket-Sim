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

console.log(tossAndDecision()); //final result      


function playBall() {
    const ballOutcome = Math.random() * 100;
    
    if(ballOutcome <= 16.7 ){
        return 0;
    }
    else if (ballOutcome <= 33.4){
        return 1
    }
    else if(ballOutcome <= 50.1){
        return 2
    }
    else if(ballOutcome <= 66.8){
        return "OUT"
    }
    else if(ballOutcome <= 83.5){
        return 4
    }
    else {
        return 6
    }
}



