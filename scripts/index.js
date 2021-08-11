const CHOICES = ["rock", "paper", "scissors"]; 

function computerPlay(){
    return CHOICES[Math.floor(Math.random() * 3)]; 
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection; 
    computerSelection = computerSelection; 
    if (playerSelection === computerSelection) {
        return (`A Tie! ${playerSelection} and ${computerSelection}`); 
    } else if (playerSelection === "rock" && computerSelection === "scissors" ||
        playerSelection === "scissors" && computerSelection === "paper" || 
        playerSelection === "paper" && computerSelection === "rock") {
            return (`You Win! ${playerSelection} beats ${computerSelection}`); 
        } else {
            return (`You Lose! ${computerSelection} beats ${playerSelection}`); 
        }
}

function game() {
    let playerScore = 0, computerScore = 0; 
    for (let i=0; i < 5; i++) {
        let playerSelection = prompt("Enter your selection (Rock, Paper, or Scissors)").toLowerCase().trim(); 
        while (CHOICES.indexOf(playerSelection) == -1) {
            console.log("Please enter a valid value!");
            playerSelection = prompt("Enter your selection (Rock, Paper, or Scissors)").toLowerCase().trim(); 
        }
        let computerSelection = computerPlay(); 
        console.log(`Computer selected ${computerSelection}`); 
        let result = playRound(playerSelection, computerSelection); 
        if (result.indexOf("Win") != -1) {
            playerScore++; 
        } else if (result.indexOf("Lose") != -1) {
            computerScore++; 
        }
        console.log(result);
        console.log(`Your score: ${playerScore}, Computer score: ${computerScore}`); 
    }
    console.log((playerScore > computerScore) ? "You Win!" : "You Lose"); 
}


const battleMusic = document.querySelector("#battle-music"); 
const battleMusicMute = document.querySelector("#mute-unmute"); 
const icon = document.querySelector("#mute-unmute i")
battleMusicMute.onclick = () => {
    icon.classList.toggle("fa-volume-mute")
    icon.classList.toggle("fa-volume-up")
    if (battleMusic.paused) {
        battleMusic.play(); 
    } else {
        battleMusic.pause(); 
    }
}


/* TODOS 
1. Page open animation: 
    - screen fade from black with effect 
    - pokemons move from one side of the screen to their location 
    - healthbar's health fills up 
    - animate text
*/ 

const openAnimation = document.querySelector(".open-animation"); 
console.log(openAnimation); 