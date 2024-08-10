export default function Log({ gameTurns }) {
	console.log(gameTurns);
	return (
		<section id="log">
			<ol>
				{gameTurns.map((turn) => (
					<li key={turn.tile} className="log-turn">
						<span className="log-player">{turn.player}</span>
						<span className="log-tile">
							<span className="log-turn-col">{turn.tile.colIndex + 1}</span>
							<span className="log-turn-row">{turn.tile.rowIndex + 1}</span>
						</span>
					</li>
				))}
			</ol>
		</section>
	);
}
