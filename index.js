//let match = require('./match.js');
let match = require('./match.js');
let player = require('./player.js');

let player1 = new player('dave');
let player2 = new player('tim');




let playerMatch = new match([player1, player2]);

//console.log('playerMatch',playerMatch);

for(let i = 0; i < 6; i++){
    playerMatch.pointWonBy (player1.id);
    playerMatch.pointWonBy (player1.id);
    playerMatch.pointWonBy (player1.id);

    playerMatch.pointWonBy (player2.id);
    playerMatch.pointWonBy (player2.id);
    playerMatch.pointWonBy (player2.id);
}
playerMatch.showScore();

playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.pointWonBy (player2.id);
playerMatch.showScore();
