import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Player from "./components/Player";

const PLAYERS = { O: "Player 1", X: "Player 2" };
const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let activePlayer = "O";
	if (gameTurns.length > 0 && gameTurns[0].player === "O") {
		activePlayer = "X";
	}
	return activePlayer;
}

function deriveGameBoard(gameTurns) {
	const gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
	for (const turn of gameTurns) {
		const { player: playerSymbol, tile } = turn;
		const { rowIndex, colIndex } = tile;
		gameBoard[rowIndex][colIndex] = playerSymbol;
	}
	return gameBoard;
}

function deriveWinner(gameBoard, players) {
	let winner;
	for (const combination of WINNING_COMBINATIONS) {
		const tileOne = gameBoard[combination[0].row][combination[0].column];
		const tileTwo = gameBoard[combination[1].row][combination[1].column];
		const tileThree = gameBoard[combination[2].row][combination[2].column];
		if (tileOne !== null && tileOne === tileTwo && tileOne === tileThree) {
			winner = players[tileOne];
		}
	}
	return winner;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	const gameBoard = deriveGameBoard(gameTurns);
	const activePlayer = deriveActivePlayer(gameTurns);

	const winner = deriveWinner(gameBoard, players);

	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prev) => [{ player: activePlayer, tile: { rowIndex, colIndex } }, ...prev]);
	}

	function handleNameChange(symbol, newName) {
		setPlayers((prev) => ({ ...prev, [symbol]: newName }));
	}

	function handleRestart() {
		setGameTurns([]);
	}

	return (
		<main>
			<section id="players">
				<Player
					initialName={players.O}
					symbol="O"
					onNameChange={handleNameChange}
					isActive={activePlayer === "O"}
				/>
				<Player
					initialName={players.X}
					symbol="X"
					onNameChange={handleNameChange}
					isActive={activePlayer === "X"}
				/>
			</section>
			<section id="game-board">
				<ol id="board-rows">
					{gameBoard.map((row, rowIndex) => {
						return (
							<li key={rowIndex} className="board-row-item">
								<ol id="board-row-cols">
									{row.map((playerSymbol, colIndex) => {
										return (
											<li key={colIndex} className="board-row-col">
												<button
													onClick={() => handleSelectSquare(rowIndex, colIndex)}
													className="board-button"
													disabled={playerSymbol}
													data-content={playerSymbol}
												>
													{playerSymbol}
												</button>
											</li>
										);
									})}
								</ol>
							</li>
						);
					})}
				</ol>
			</section>
			{(winner || hasDraw) && (
				<section id="game-over">
					<div>
						{winner && <p>{winner} has won!</p>}
						{hasDraw && <p>It&apos;s a draw!</p>}
					</div>
					<button onClick={handleRestart}>Play again!</button>
				</section>
			)}
			<section id="log"></section>
		</main>
	);
}

export default App;
