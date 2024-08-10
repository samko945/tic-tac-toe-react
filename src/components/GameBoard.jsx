export default function GameBoard({ gameBoard, activePlayer, onSelectSquare }) {
	return (
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
												onClick={() => onSelectSquare(rowIndex, colIndex)}
												className="board-button"
												disabled={playerSymbol}
												data-content={playerSymbol}
												style={!playerSymbol ? { "--hoverSymbol": `"${activePlayer}"` } : null}
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
	);
}
