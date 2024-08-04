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
		<div>
			<span>{symbol}</span>
			{isEditing && (
				<input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
			)}
			{!isEditing && <span>{playerName}</span>}
			<button onClick={toggleEditMode}>{isEditing ? "Save" : "Edit"}</button>
		</div>
	);
}
