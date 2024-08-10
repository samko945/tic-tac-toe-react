import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

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
			winner = {};
			winner.symbol = tileOne;
			winner.name = players[tileOne];
		}
	}
	return winner;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	const [gameWins, setGameWins] = useState({ O: 0, X: 0 });
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
		if (!hasDraw) {
			setGameWins((prev) => ({ ...prev, [winner.symbol]: prev[winner.symbol] + 1 }));
		}
	}

	return (
		<main>
			<section id="players">
				<Player
					initialName={players.O}
					symbol="O"
					onNameChange={handleNameChange}
					isActive={activePlayer === "O"}
					wins={gameWins.O}
				/>
				<Player
					initialName={players.X}
					symbol="X"
					onNameChange={handleNameChange}
					isActive={activePlayer === "X"}
					wins={gameWins.X}
				/>
			</section>
			<GameBoard gameBoard={gameBoard} activePlayer={activePlayer} onSelectSquare={handleSelectSquare} />
			{(winner || hasDraw) && <GameOver winner={winner} hasDraw={hasDraw} onRestart={handleRestart} />}
			<Log gameTurns={gameTurns} />
		</main>
	);
}

export default App;
