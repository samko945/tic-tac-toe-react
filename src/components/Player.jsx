import { useState } from "react";

export default function Player({ initialName, symbol, onNameChange }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);
	function toggleEditMode() {
		setIsEditing((prev) => !prev);
		if (isEditing) {
			onNameChange(symbol, playerName);
		}
	}
	return (
		<div className="player">
			<span>
				<b>{symbol}</b>
			</span>
			{isEditing && (
				<input
					className="player-name"
					type="text"
					value={playerName}
					onChange={(e) => setPlayerName(e.target.value)}
					required
					autoFocus
				/>
			)}
			{!isEditing && <span className="player-name">{playerName}</span>}
			<button onClick={toggleEditMode} className="edit-player">
				{isEditing ? "Save" : "Edit"}
			</button>
		</div>
	);
}
