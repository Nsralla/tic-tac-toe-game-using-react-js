export default function GameOver({winner, setGameTurns}){
    return (
    <div id="game-over">
        <h2>Game Over!</h2>

        {winner ? <p>{winner} won!</p>: <p>DRAW!</p>}
        <p>
        <button onClick={()=>(setGameTurns([]))}>Rematch!</button>
        </p>
    </div>
    );
}