import { Fragment } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";
function App() {

    const [gameTurns, setGameTurns] = useState([]);
    const [playersNames, setPlayersNames] = useState({
      'X':'PLayer1',
      'O': 'Player2'
    });
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }

    const initialGameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];


    let gameBoard = initialGameBoard;
      for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    let winner = null;

    // check for winning
    for(const combination of WINNING_COMBINATIONS ){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
          winner = playersNames[firstSquareSymbol];
        }
    }


    const hasDraw = gameTurns.length === 9 && !winner;


    
  


    function handleWhichPlayer(rowIndex, colIndex) {
      setGameTurns((prevTurns)=>{
        let currentPlayer = "X";

        if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
        }

        const updatedTurns = [
            {square: {row:rowIndex, col:colIndex}, player:currentPlayer},
            ...prevTurns
        ];

        return updatedTurns;
      });
    }

      function handlePlayerNameChange(symbol, newName) {
        setPlayersNames((prevPlayers) => {
          return {
            ...prevPlayers,
            [symbol]: newName,
          };
        });
      }
    
  return (
    <Fragment>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              onChangeName={handlePlayerNameChange}
              isActive={currentPlayer === "X" ? true : false}
              playerName="player1"
              playerSymbol="X"
            />
            <Player
              onChangeName={handlePlayerNameChange}
              isActive={currentPlayer === "O" ? true : false}
              playerName="player2"
              playerSymbol="O"
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} setGameTurns={setGameTurns} />
          )}
          <GameBoard handleWhichPlayer={handleWhichPlayer} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </Fragment>
  );
}

export default App;
