
let home = document.querySelector('#homePage');
let gameView = document.getElementById('gameView');

document.getElementById('newGameHome').onclick = startGame;



function startGame(){
    // affichage de l'ecran de jeu 
    home.remove();
    gameView.style.display = 'block';

    
}