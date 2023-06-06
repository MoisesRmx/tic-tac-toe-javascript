const raiz = document.getElementById('root');



function App() {
  function validacionResultado() {
    for(let i = 0; i <= 7; ++i) {
      const winCondition = winningConditions[i]
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === null || b === null || c === null)
        continue;
      if (a === b && b === c) {
        roundWon = true;
        break
      }
    }
    if (roundWon) {
      gameActive = false;
    }
  }

  function cleanBoard() {
    board = Array(9).fill(null);
    squares.forEach((name, index) => {
      name.innerText = board[index]
      name.classList.remove('check')
    })
    validacionResultado()
    gameActive = true;
    roundWon = false;
  }

  function winGame() {
    const winnerCtn = document.createElement('div')
    root.appendChild(winnerCtn).classList.add('winner')
    const winnerTxt = document.createElement('div')
    winnerCtn.appendChild(winnerTxt).classList.add('text')
    winnerTxt.innerText = `Gano ${turnOld}`
    const winnerBtn = document.createElement('div')
    winnerCtn.appendChild(winnerBtn).classList.add('win')
    winnerBtn.innerText = 'Reiniciar'
    winnerBtn.addEventListener('click', () => {
      cleanBoard()
      root.removeChild(winnerCtn)
    })
  }

  function SquareGenerator(contendSquares, squareArray) {
    const cellSquares = document.createElement('div');
    contendSquares.appendChild(cellSquares).classList.add('square');
    cellSquares.innerText = squareArray;
  }

  let board = Array(9).fill(null);
  const TURNS = {
    X: "×",
    O: "o"
  }
  let turns = TURNS.X;
  let divWinner = ``;
  let turnOld = ''

  let gameActive = true;
  let roundWon = false;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const mainGame = document.createElement('main');
  raiz.appendChild(mainGame).classList.add('board');
  const nameGame = document.createElement('h1');
  mainGame.appendChild(nameGame).innerText = 'Tic tac toe';
  const contentGame = document.createElement('section');
  mainGame.appendChild(contentGame).classList.add('game');

  board.map(valor  => {
    SquareGenerator(contentGame , valor)
  })


  const squares = document.querySelectorAll('.game .square');
  squares.forEach((name, index) => {
    name.addEventListener('click', () => {
      if(gameActive === true) {
        if (!name.classList.contains('check')) {
          name.innerText = turns;
          name.classList.add('check')
          board[index] = turns;
          turnOld = turns
          const turnsSquares = document.querySelectorAll(".turn .square");
          if (turns === TURNS.X) {
            turnsSquares[1].classList.add('is-selected')
            turnsSquares[0].classList.remove('is-selected')
          } else {
            turnsSquares[0].classList.add('is-selected')
            turnsSquares[1].classList.remove('is-selected')
          }
          if (turns === TURNS.X) {
            turns = TURNS.O
          } else {
            turns = TURNS.X
          }
        }
        validacionResultado()
      }
      if (gameActive === false) {
        winGame()
      }
    })
  })

  const turnsContainer = document.createElement('section');
  mainGame.appendChild(turnsContainer).classList.add('turn');
  SquareGenerator(turnsContainer, TURNS.X);
  document.querySelectorAll(".turn .square")[0].classList.add('is-selected');
  SquareGenerator(turnsContainer, TURNS.O);
}

App()
