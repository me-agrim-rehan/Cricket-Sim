function toss (){   
   const Prob = Math.random() 
   if (Prob > 0.5){
        return "Team A";
   }
   else {
    return "Team B"
   };
}          // task one 



function decision (){
   const desc = Math.random() * 10;
    if(desc > 5){
        return "Bat"
    }else{
        return "Bowl"
    };
};     // task two


function tossAndDecision (){
    const tossResult = toss();
    const decisionResult = decision();
    
    return tossResult + " won the toss and has elected to " + decisionResult +" first!";
};  // task 3

console.log(tossAndDecision()); //final result    