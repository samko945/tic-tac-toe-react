export default function GameOver({ winner, hasDraw, onRestart }) {
	return (
		<section id="game-over">
			<div>
				{winner && <p>{winner.name} has won!</p>}
				{hasDraw && <p>It&apos;s a draw!</p>}
			</div>
			<button onClick={onRestart}>Play again!</button>
		</section>
	);
}
