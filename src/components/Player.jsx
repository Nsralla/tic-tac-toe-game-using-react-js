import { useState } from "react";

export default function Player({ playerName, playerSymbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(playerName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);

        if(isEditing)
            onChangeName(playerSymbol, playerName);

      // same as setEditName(!isEditing)
    }

    function handleNameChange(event) {
        setEditName(event.target.value);
    }

    function handleNameChange2(event) {
        if (event.key === "Enter") {
        setIsEditing(false);
        }
    }


    return (
    <>
        <li className={isActive? 'active':undefined}>
            <span className="player">
            {!isEditing ? (
                <span className="player-name">{editName}</span>
            ) : (
                <input
                    type="text"
                    value={editName} // the value inside the input element
                    onChange={handleNameChange} // update name with each button clicked
                    onKeyDown={handleNameChange2} // handle Enter button
                    autoFocus
                    required
                />
            )}
            <span className="player-symbol">{playerSymbol}</span>
            </span>

            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    </>
    );
}
