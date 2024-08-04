import { useState } from "react";

const PLAYERS = [{ X: "Player 1" }, { O: "Player 2" }];
const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let activePlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		activePlayer = "O";
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

	console.log(gameTurns);

	return (
		<main>
			<section id="players"></section>
			<section id="game-board">
				<ol>
					{gameBoard.map((row, rowIndex) => {
						return (
							<li key={rowIndex}>
								<ol>
									{row.map((playerSymbol, colIndex) => {
										return (
											<li key={colIndex}>
												<button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
