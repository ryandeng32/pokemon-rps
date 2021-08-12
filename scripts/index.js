const powerBtn = document.querySelector("#power-btn"); 
const muteBtn = document.querySelector("#mute-btn"); 
const muteBtnIcon = document.querySelector("#mute-btn i")
const battleMusic = document.querySelector("#battle-music"); 

const view = document.querySelector("#view");
const textBox = document.querySelector(".textbox"); 
const openAnimation = document.querySelector(".open-animation"); 

const playerImg = document.querySelector(".player");
const computerImg = document.querySelector(".computer");
const computerScoreRender = document.querySelector(".computer-tag-score"); 
const playerScoreRender = document.querySelector(".player-tag-score"); 
const playerChoiceEl = document.querySelector(".player-choice"); 
const computerChoiceEl = document.querySelector(".computer-choice"); 

// when isAnimating is true, no other animations can be started 
// i.e. clicking on buttons will have no effect. 
let isAnimating = false; 
// when isGameEnding is true, the choices buttons will have no effect 
let isGameEnding = false;
let isPlaying = false;
let timer = null; 
// sets the initial value for debugging purposes 
let initPlayerScore = 0, initComputerScore = 0;
let playerScore = initPlayerScore, computerScore = initComputerScore; 
let textQueue = []; 
let animateTextDoneEvent = new CustomEvent("animatetextdone", {
}); 

// initializes game
function gameInit() {
    renderScore()
    view.classList.add("init"); 
}

// text prompt when game starts 
function startGame() {
    textQueue.push("Welcome to Rock Paper Scissors (Pokemon Version), first to 5 wins"); 
    textQueue.push("Choose from the buttons to the right. (click STATUS to see the current score"); 
}

// resets variables and end game 
function gameEnd() {
    isPlaying = false;
    isGameEnding = false
    textQueue = [];
    clearTimeout(timer)
    playerScore = initPlayerScore; 
    computerScore = initComputerScore;
    view.classList.remove("init");
    view.classList.remove("no-screen"); 
    computerImg.style.right = "-35%"; 
    playerImg.style.left = "-35%"
    textBox.textContent = ""; 
}


// RPS game logic 
function computerPlay(){
    const CHOICES = ["rock", "paper", "scissors"]; 
    return CHOICES[Math.floor(Math.random() * 3)]; 
}

function getResult(playerSelection, computerSelection) {
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

function checkGameOver() {
    if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
            isGameEnding = true; 
            timer = setTimeout(()=>{gameEnd()}, 5000); 
            return "You Win! Thanks for playing"; 
        }
        else {
            isGameEnding = true; 
            timer = setTimeout(()=>{gameEnd()}, 5000); 
            return "You Lose! Thanks for playing"; 
        }
    }
    return ''; 
}

function playRound(playerSelection) {
    if (!isAnimating && !isGameEnding) {     
        let computerSelection = computerPlay(); 
        playerChoiceEl.src=`images/choices/${playerSelection}.png`;
        playerChoiceEl.classList.add("shoot");
        computerChoiceEl.src=`images/choices/${computerSelection}.png`;
        computerChoiceEl.classList.add("shoot");
        let result = getResult(playerSelection, computerSelection); 
        if (result.indexOf("Win") != -1) {
            playerScore++; 
            computerImg.classList.add("hurt");
        } else if (result.indexOf("Lose") != -1) {
            computerScore++; 
            playerImg.classList.add("hurt");
        } else {
            computerImg.classList.add("tie"); 
            playerImg.classList.add("tie"); 
        }
        renderScore(playerScore, computerScore); 
        showMsg(result, checkGameOver()); 
    }
}


// Text animation 
function showMsg(...msgs) {
    if (!isAnimating) {
        msgs.forEach(msg => {
            if (msg !== ''){
                textQueue.push(msg); 
            }
        })
        view.dispatchEvent(animateTextDoneEvent); 

    }
}

function animateFirstChar(msg){
    if (msg !== '') {
        let charEl = document.createElement("span"); 
        charEl.textContent = msg[0]; 
        textBox.appendChild(charEl); 
        timer = setTimeout(()=>{animateFirstChar(msg.slice(1));}, 20); 
    } else {
        isAnimating = false; 
        view.dispatchEvent(animateTextDoneEvent);
    }    
}    

function animateText(msg) {
    textBox.textContent = "";
    animateFirstChar(msg); 
}    


// score rendering 
function renderScore() {
    computerScoreRender.style.width = `${((1-(playerScore / 5)) * 100).toFixed(0)}%`
    playerScoreRender.style.width = `${((1-(computerScore / 5)) * 100).toFixed(0)}%`
}


// EVENT LISTENERS 
// powerBtn: start / restart game 
powerBtn.onclick = () => {
    isPlaying = !isPlaying; 
    (isPlaying) ? gameInit() : gameEnd();
}
// muteBtn: mute / play
muteBtn.onclick = () => {
    muteBtnIcon.classList.toggle("fa-volume-mute")
    muteBtnIcon.classList.toggle("fa-volume-up")
    if (battleMusic.paused) {
        battleMusic.play(); 
    } else {
        battleMusic.pause(); 
    }
}
// loops music 
battleMusic.addEventListener("ended", () => {
    battleMusic.currentTime = 0; 
    battleMusic.play();
})

// displays text and set player, computer position when start screen animation ends 
view.addEventListener("animationend", (e) => {
    if (e.animationName === "open-animation") {
        view.classList.add("no-screen");
        view.classList.remove("init");    
        computerImg.style.right = "7%"; 
        playerImg.style.left = "-3%"
        startGame();
        view.dispatchEvent(animateTextDoneEvent); 
    }
})

// animate text from queue 
view.addEventListener("animatetextdone", () => {
    if (textQueue.length !== 0) {
        isAnimating = true; 
        timer = setTimeout(()=>{animateText(textQueue.shift())}, 1000); 
    }
})

// stops choices animation 
playerChoiceEl.addEventListener("animationend", (e) => {
    if (e.animationName === "player-shoot"){
        playerChoiceEl.classList.remove("shoot");
    }
})

computerChoiceEl.addEventListener("animationend", (e) => {
    if (e.animationName === "computer-shoot"){
        computerChoiceEl.classList.remove("shoot");
    }
})

// stops player & computer animation on "hurt" or "tie" 
playerImg.addEventListener("animationend", (e) => {
    if (e.animationName === "hurt"){
        playerImg.classList.remove("hurt");
    }
    if (e.animationName === "tie") {
        playerImg.classList.remove("tie"); 
    }
})

computerImg.addEventListener("animationend", (e) => {
    if (e.animationName === "hurt"){
        computerImg.classList.remove("hurt");
    }
    if (e.animationName === "tie") {
        computerImg.classList.remove("tie"); 
    }
})

// the choices buttons 
document.querySelector("#statusBtn").onclick = () => {
    if (!isGameEnding()){
        showMsg(`Your score: ${playerScore}, Computer score: ${computerScore}`); 
    }
}
document.querySelector("#rockBtn").onclick = () => {
   playRound("rock"); 
}
document.querySelector("#paperBtn").onclick = () => {
    playRound("paper"); 
}
document.querySelector("#scissorsBtn").onclick = () => {
    playRound("scissors"); 
}
