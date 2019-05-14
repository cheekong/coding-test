const DUECE = 'Duece';
const ADVANTAGE = 'Advantage';
const scores = [0,15, 30, 40];
const points = [
    {
        value: 1,
        label: '0'
    },
    {
        value: 2,
        label: '15'
    },
    {
        value: 3,
        label: '30'
    },
    {
        value: 4,
        label: '40'
    },
    {
        value: 4,
        label: 'Advantage'
    },
    {
        value: 5,
        label: 'Game'
    }
]


class Match {
    
    constructor(players){
        this.playersById = {};
        this.allPlayersId = [];
        this.isTieBreak = false;
        this.isSetWon = false;

        players.map(player => {
            let id = player.id;
            let contestant = {
                id: id,
                name: player.name,
                score: 0,
                point: {
                    value: points[0].value,
                    label: points[0].label
                }
            }

            this.playersById[player.id] = contestant;
            this.allPlayersId.push(id);
        });
    }

    pointWonBy(id) {
        if(!this.isSetWon){
            if(!this.isTieBreak){
                this._addPointRegularRules(id);
                this._hasTieBreak();
            } else {
                this.__addPointTieBreakRules(id);
            }
        }

        this._hasWinSet(id);
    }

    showScore() {
        const   player1 = this.playersById[this.allPlayersId[0]],
                player2 = this.playersById[this.allPlayersId[1]];
        const   player1score = player1.score,
                player2score = player2.score,
                player1PointValue = player1.point.value,
                player2PointValue = player2.point.value,
                player1PointLabel = player1.point.label,
                player2PointLabel = player2.point.label;

        let pointNotification =  ', ';

        if(player1PointValue === 4 && player2PointValue === 3){
            pointNotification += ADVANTAGE + ' by ' + player1.name;
        } else if (player1PointValue === 3 && player2PointValue === 4){
            pointNotification += ADVANTAGE + ' by ' + player2.name;
        } else if (player1PointValue === 3 && player2PointValue === 3) {
            pointNotification += DUECE;
        } else if (player1PointValue > 0 || player2PointValue > 0){
            pointNotification += player1PointLabel + '-' + player2PointLabel;
        } else {
            pointNotification = '';
        }

        console.log(player1score + '-' + player2score + pointNotification);
    }

    _hasTieBreak() {
        const   player1 = this.playersById[this.allPlayersId[0]],
                player2 = this.playersById[this.allPlayersId[1]];

        if(player1.score === 6 && player2.score === 6){
            this.isTieBreak = true;
            player1.point = {value: 0, label: '0'};
            player2.point = {value: 0, label: '0'};
        }
    }

    _hasWinSet(id){
        const oponentId = this.allPlayersId.find((element) => id != element);
        let opponent = this.playersById[oponentId],
            winningPlayer = this.playersById[id];
        const scoreDiff = Math.abs(opponent.score - winningPlayer.score);

        if(!this.isTieBreak){
            if(winningPlayer.score === 6 && scoreDiff >= 2){
                console.log(winningPlayer.name + ' has won the set');
                this.isSetWon = true;
            }
        } else {
            if(winningPlayer.score === 7){
                console.log(winningPlayer.name + ' has won the set');
                this.isSetWon = true;
            }
        }
        
//console.log('winningPlayer', winningPlayer);
//console.log('opponent', opponent);
    }

    _addPointRegularRules(id) {
        const oponentId = this.allPlayersId.find((element) => id != element);
        let opponent = this.playersById[oponentId],
            winningPlayer = this.playersById[id];
        const nextPoint = this._getNextPoint(winningPlayer.point);

        if(opponent.point.value === 4 && nextPoint.value === opponent.point.value ){
            opponent.point = {...points[2]};
            winningPlayer.point = {...points[2]};
        } else if(nextPoint.value >= 4 && (nextPoint.value - opponent.point.value) >= 2) {
            opponent.point = {...points[0]};
            winningPlayer.point = {...points[0]};
            winningPlayer.score ++; 
        } else {
            winningPlayer.point = nextPoint;
        }
    }

    __addPointTieBreakRules(id) {
        const oponentId = this.allPlayersId.find((element) => id != element);
        let opponent = this.playersById[oponentId],
            winningPlayer = this.playersById[id];
            winningPlayer.point.value++;
            winningPlayer.point.label =  winningPlayer.point.value.toString();
            
            if(winningPlayer.point.value >= 7 && Math.abs(winningPlayer.point.value - opponent.point.value) >= 2){
                winningPlayer.score ++;
                winningPlayer.point.value = 0;
                winningPlayer.point.label = winningPlayer.point.value.toString();
                opponent.point.value = 0;
                opponent.point.label = opponent.point.value.toString();
            }
    }

    _getNextPoint(currentPoint) {
        let result = {...currentPoint};
    
        for(let point of points){
            const value = point.value;
            if(result.value < value){
                result = {...point};
                break;
            }
    
        }
        return result;
    }
}

module.exports = Match;