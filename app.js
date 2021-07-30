let jumpScorePlayer1 = 0;
let jumpScorePlayer2 = 0;
let elanFirstPlayer;
let elanSecondPlayer;
let activePlayer = 0;
let elan = 0;

let jetonPlayer1 = document.querySelector('.jetonPlayer1');
let jetonPlayer2 = document.querySelector('.jetonPlayer2');
let itemPlayer1 = document.querySelector('.player1');
let itemPlayer2 = document.querySelector('.player2');
let dice = document.querySelector('.dice-player');

let home = document.querySelector('#homePage');
let gameView = document.getElementById('gameView');

//lancement des fonctions 
document.getElementById('home').onclick = homeRestart;
document.getElementById('newGameHome').onclick = startGame;
document.getElementById('reset').onclick = resetGame;
document.getElementById('rollDice').onclick = rollDice;
document.getElementById('jump').onclick = jump;

function homeRestart(){
    location.reload();
}
function startGame(){
    // affichage de l'ecran de jeu 
    home.remove();
    gameView.style.display = 'block';
    
    newRound();
}

function resetGame(){
    jumpScorePlayer1 = 0;
    jumpScorePlayer2 = 0;
    elan = 0;
    document.querySelector('.elanValueFirst').innerHTML = elan;
    document.querySelector('.elanValueSecond').innerHTML = elan;
    document.querySelector('.jumpScoreValueFirst').innerHTML = jumpScorePlayer1;
    document.querySelector('.jumpScoreValueSecond').innerHTML = jumpScorePlayer2;
    itemPlayer1.style.bottom = '40px';
    itemPlayer1.style.width = '-30px';
    itemPlayer2.style.bottom = '-30px';
    itemPlayer2.style.bottom = '40px';
    activePlayer = 0;

    newRound();
}

function newRound(){
    if(activePlayer === 1){
        activePlayer = 2;
        jetonPlayer2.style.opacity = "1";
        jetonPlayer1.style.opacity = "0";
    } else {
        activePlayer = 1;
        jetonPlayer1.style.opacity = "1";
        jetonPlayer2.style.opacity = "0";
    }
}

function rollDice(){
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let interval = null;
    let counter = 1;
    
    function diceAnimation(){
        counter++;
        if(counter == 11){
            clearInterval(interval);
            dice.remove();
            dice = document.createElement('img');
            dice.setAttribute('src', './medias/img/des/face-'+ randomNumber + '.png');
            dice.className = 'dice-player';
            dice.style.left = '80%';
            document.querySelector('.dice-container').appendChild(dice);
            getScore(randomNumber);
        } else{
            dice.remove();
            let a = Math.floor(Math.random() * 6) + 1;
            dice = document.createElement('img');
            dice.setAttribute('src', './medias/img/des/face-'+ a + '.png');
            dice.className = 'dice-player';
            dice.style.left = counter * 8 +'%';
            
            document.querySelector('.dice-container').appendChild(dice);
        }
    }

    interval = setInterval(diceAnimation, 80);
} 

function getScore(score){
    
    if( score === 1 ){
        elan = 0;  
    } else {
        elan += score; 
    }
    if(activePlayer === 1){
        document.querySelector('.elanValueFirst').innerHTML = elan;
    }  else{
        document.querySelector('.elanValueSecond').innerHTML = elan;
    }

    if(elan === 0){
        newRound();
    }
}

function jump(){
    if(activePlayer === 1){
        jumpScorePlayer1 += elan;
        if(jumpScorePlayer1 >= 100){
            jumpScorePlayer1 = 100;
        }
        elan = 0;
        document.querySelector('.elanValueFirst').innerHTML = elan;
        document.querySelector('.jumpScoreValueFirst').innerHTML = jumpScorePlayer1;
        itemPlayer1.style.bottom = 'calc('+ jumpScorePlayer1 + '% - 20px)';
        // itemPlayer1.style.right = "-15%";
    } else{
        jumpScorePlayer2 += elan;
        if(jumpScorePlayer2 >= 100){
            jumpScorePlayer2 = 100;
        }
        elan = 0;
        document.querySelector('.elanValueSecond').innerHTML = elan;
        document.querySelector('.jumpScoreValueSecond').innerHTML = jumpScorePlayer2;
        itemPlayer2.style.bottom = 'calc(' + jumpScorePlayer2  + '% - 20px)';
        // itemPlayer2.style.left = "0";
    }
    if(jumpScorePlayer1 === 100 || jumpScorePlayer2 === 100){
        if(activePlayer === 1){
            playerOneVictory();
        } else{
            playerTwoVictory();
        }
    } else{
        console.log(jumpScorePlayer1 + 'player2' +jumpScorePlayer2);
        newRound();
    }
}

function playerOneVictory(){
    itemPlayer1.style.bottom = "50%";
    itemPlayer1.style.width = "150px";
    let victory = document.createElement('div');
        victory.className = ('victory');
        victory.textContent = ('Le joueur 1 a remporté le trophé !!!!!');
        gameView.appendChild(victory);
    
}

function playerTwoVictory(){
    itemPlayer2.style.bottom = "50%";
    itemPlayer2.style.width = "150px";
    let victory = document.createElement('div');
        victory.className = ('victory');
        victory.textContent = ('Le joueur 2 a remporté le trophé !!!!!');
        gameView.appendChild(victory);
    
}