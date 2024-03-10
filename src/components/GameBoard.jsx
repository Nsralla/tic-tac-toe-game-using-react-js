
export default function GameBoard({handleWhichPlayer,board}){
    
    return(
        <ol id="game-board">
            {board.map((row,rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((col,colIndex)=>(
                            <li key={colIndex}>
                                <button onClick={()=>(handleWhichPlayer(rowIndex,colIndex))} disabled={col? true:false}>{col}</button>
                            </li>
                            ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
};