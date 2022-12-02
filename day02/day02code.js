const fs = require("fs");

const lines = fs
    .readFileSync("inputday2.txt", { encoding: "utf-8" })
    .split("\n")
    .map((line) => line.split(" "));

//console.log(lines);

let rules = { rock: "scissors", scissors: "paper", paper: "rock" }

let pointsbyShape = { rock: 1, paper: 2, scissors: 3 }
let pointsbyGame = { lost: 0, draw: 3, win: 6 };

let trans = { A: "rock", X: "rock", B: "paper", Y: "paper", C: "scissors", Z: "scissors" };

let deTransMe = {rock: "X", paper: "Y", scissors: "Z"}

function gameTotal(input) {
    let totalScore = 0;
    for (let game of input) {
        let [opponent, result] = game;
        let me = myPlay(opponent, result);
        let roundScore = round(opponent, me);
        //console.log(roundScore, "roundscore for game");
        totalScore += roundScore;
    }
    return totalScore;
}

function round(opponent, me) {
    let score = 0;
    let opponentPlay = trans[opponent];
    let mePlay = trans[me];
    // Points I gain just for playing a Shape
    score = pointsbyShape[mePlay];
    if (rules[mePlay] === opponentPlay) {
        score += pointsbyGame.win;
    } else if (mePlay === opponentPlay) {
        score += pointsbyGame.draw;
    }
    return score;
}

function myPlay(opponent, result){
    let myplay = "";
    let opponentPlay = trans[opponent];
    if(result === "X"){ //lose
      myplay = rules[opponentPlay]; 
      //console.log(myplay, opponentPlay, "Line 39")
    } else if (result === "Y"){
      myplay = opponentPlay;
    } else{
      for(const [key, value] of Object.entries(rules)){
        if(value === opponentPlay){
          myplay = key;
        }
      }
      
    }
    return deTransMe[myplay];
  }
  

console.log(gameTotal(lines));