import { useState } from "react";

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

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	const gameBoard = deriveGameBoard(gameTurns);
	const activePlayer = deriveActivePlayer(gameTurns);

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prev) => [{ player: activePlayer, tile: { rowIndex, colIndex } }, ...prev]);
	}

	function handleNameChange(symbol, newName) {
		setPlayers((prev) => ({ ...prev, [symbol]: newName }));
	}

	console.log(gameTurns);

	return (
		<main>
			<section id="players">
				<Player initialName={players.O} symbol="O" onNameChange={handleNameChange} />
				<Player initialName={players.X} symbol="X" onNameChange={handleNameChange} />
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
			<section id="log"></section>
		</main>
	);
}

export default App;
