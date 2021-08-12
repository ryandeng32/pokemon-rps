const textBox = document.querySelector(".textbox"); 
const powerBtn = document.querySelector("#power-btn"); 
const view = document.querySelector("#view");
const playerImg = document.querySelector(".player");
const computerImg = document.querySelector(".computer");
const openAnimation = document.querySelector(".open-animation"); 
const statusBtn = document.querySelector("#statusBtn")
const computerScoreRender = document.querySelector(".computer-tag-score"); 
const playerScoreRender = document.querySelector(".player-tag-score"); 
const battleMusic = document.querySelector("#battle-music"); 
const battleMusicMute = document.querySelector("#mute-btn"); 
const icon = document.querySelector("#mute-btn i")
const playerChoiceEl = document.querySelector(".player-choice"); 
const computerChoiceEl = document.querySelector(".computer-choice"); 
let isAnimating = false; 

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


battleMusicMute.onclick = () => {
    icon.classList.toggle("fa-volume-mute")
    icon.classList.toggle("fa-volume-up")
    if (battleMusic.paused) {
        battleMusic.play(); 
    } else {
        battleMusic.pause(); 
    }
}


function checkGame() {
    if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
            timer = setTimeout(()=>{gameEnd()}, 5000); 
            return "You Win! Thanks for playing"; 
        }
        else {
            timer = setTimeout(()=>{gameEnd()}, 5000); 
            return "You Lose! Thanks for playing"; 
        }
    }
    return ''; 
}


function renderScore() {
    computerScoreRender.style.width = `${((1-(playerScore / 5)) * 100).toFixed(0)}%`
    playerScoreRender.style.width = `${((1-(computerScore / 5)) * 100).toFixed(0)}%`
}

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

function playRound(playerSelection) {
    if (!isAnimating) {     
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
        }
        renderScore(playerScore, computerScore); 
        showMsg(result, checkGame()); 
    }
}

playerImg.addEventListener("animationend", (e) => {
    if (e.animationName === "hurt"){
        playerImg.classList.remove("hurt");
    }
})

computerImg.addEventListener("animationend", (e) => {
    if (e.animationName === "hurt"){
        computerImg.classList.remove("hurt");
    }
})
function startGame() {
    textQueue.push("Welcome to Rock Paper Scissors (Pokemon Version), first to 5 wins"); 
    textQueue.push("You can choose from the buttons to the right. (NOTE: STATUS will show you the current score"); 
   
}

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


let textQueue = []; 
let isPlaying = false;
let timer = null; 
let initPlayerScore = 0, initComputerScore = 0;
let playerScore = initPlayerScore, computerScore = initComputerScore; 
let animateTextDoneEvent = new CustomEvent("animatetextdone", {
}); 

function gameInit() {
    renderScore()
    console.log(textQueue);
    view.classList.add("init"); 
    
}

function gameEnd() {
    isPlaying = false;
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

powerBtn.onclick = () => {
    isPlaying = !isPlaying; 
    (isPlaying) ? gameInit() : gameEnd();
}

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

view.addEventListener("animatetextdone", () => {
    if (textQueue.length !== 0) {
        isAnimating = true; 
        timer = setTimeout(()=>{animateText(textQueue.shift())}, 500); 
    }
})

document.querySelector("#statusBtn").onclick = () => {
    showMsg(`Your score: ${playerScore}, Computer score: ${computerScore}`); 
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


// TODO 
// make width wider
// change all px to em 