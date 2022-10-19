const gameBoard = (function() {
    let sign = "x";
    const buttons = document.getElementById("gameBoard");
    let gameBoardArr = [
        [], [], [],
        [], [], [],
        [], [], [],
    ];

    const _setCoordinates = (indexGameBoard, player) => {
        gameBoardArr[indexGameBoard] === "" ? gameBoardArr[indexGameBoard] = player : null;
        _renderCoordinates(indexGameBoard, player);
    }

    const logCoordinates = () => {
        console.log(gameBoardArr);
    }

    const _checkWin = () => {
        const variationArr = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6],
        ]
        variationArr.forEach(element => {
            let counterX = 0;
            let counterO = 0;
            element.forEach(element => {
                gameBoardArr[element] === "x" ? counterX++ : null ;
                counterX === 3 ?  displayActions.displayWin("Winner X") : null ;

                gameBoardArr[element] === "o" ? counterO++ : null ;
                counterO === 3 ? displayActions.displayWin("Winner O") : null ;
            })
        });
    }
    const _checkTie = () => {
        let counterTie = 0
        gameBoardArr.forEach(element => {
            element == "" ? null : counterTie++;
            counterTie == 9 ? displayActions.displayWin("Tie") : null;
        })
    }
    const _renderCoordinates = (coordinates, sign) => {
        document.getElementById(coordinates).innerText === "" ? document.getElementById(coordinates).innerText = sign : null; 
    }

    const mouseClick =  buttons.addEventListener('click', (e) =>{
        _setCoordinates(e.target.id, sign);
        _changePlayer(sign);
        displayActions.turnTitle(sign);
        _checkTie();
        _checkWin();
    });
    const resetGame = () => {
        counterO = 0;
        counterX = 0;
        sign = "x";
        for(let i = 0; i <=8;i++){
            gameBoardArr[i] = "";
        }
        for(let i = 0; i <=8;i++){
            document.getElementById(i).innerHTML = "";
        }
    }
    const _changePlayer = (input) => {
      input === "x" ? sign = "o" : sign ="x";
    }
    return {
         logCoordinates,
         resetGame,
    };
}())

const displayActions = (function (){
    const winnerAlert = document.getElementById("winnerAlert");
    const resetBtn = document.getElementById("btnReset");
    const winText = document.getElementById('textWinner');
    const turnSpan = document.getElementById('turnSpan');

    const displayWin = (value) => {
        winnerAlert.classList.add("open-winner-alert");
        winText.innerText = value;
    }
    const _hideWinAlert = () => {
        winnerAlert.classList.remove("open-winner-alert");
    }
    const turnTitle = (signTurn) => {
        turnSpan.innerHTML = signTurn.toUpperCase();
    }
    const clickClose =  resetBtn.addEventListener('click', () => {
            _hideWinAlert();
            gameBoard.resetGame();
            turnTitle("X");
    })
    return {
        displayWin,
        turnTitle,
    };
}())



