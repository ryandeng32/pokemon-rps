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


// Dealing with DOM 
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


const textBox = document.querySelector(".textbox"); 
const startBtn = document.querySelector("#start-btn"); 
const view = document.querySelector(".view");
const playerImg = document.querySelector(".player");
const computerImg = document.querySelector(".computer");
const openAnimation = document.querySelector(".open-animation"); 

startBtn.onclick = () => {
    if (view.classList.contains("active")) {
        restart(); 
    } 
    view.classList.toggle("active"); 
    playerImg.classList.toggle("active");
    computerImg.classList.toggle("active"); 
}

function restart() {
    view.classList.remove("no-screen"); 
    textBox.textContent = ""; 
}
view.addEventListener("animationend", (e) => {
    if (e.animationName === "open-animation") {
        view.classList.add("no-screen");
        animateText("Welcome to Rock Paper Scissors (Pokemon Version)");
    }
})
/* TODOS 
1. Page open animation: 
    - screen fade from black with effect 
    - pokemons move from one side of the screen to their location 
    - healthbar's health fills up 
    - animate text
*/ 

console.log(openAnimation); 

function animateFirstChar(msg){
    let charEl = document.createElement("span"); 
    charEl.textContent = msg[0]; 
    textBox.appendChild(charEl); 
    setTimeout(()=>{animateFirstChar(msg.slice(1));}, 30); 
}
function animateText(msg) {
    textBox.textContent = ""; 
    if (msg !== '') {
        setTimeout(()=> {
            animateFirstChar(msg); 
        }, 1000);
    }
}

