import React from "react";
import { useState } from "react";
import { FaPencilAlt, FaDumpster, FaCheck } from "react-icons/fa";
import marked from "marked";

export default function Notepad({ id, date, text, deleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);
  console.log("noteText:", noteText);
  return (
    <div className="notepad-wrapper">
      <div className="notepad-header">
        <p className="date">{date}</p>
        <div className="notepad-btn-wrapper">
          {isEditing ? (
            <button id="check-btn" onClick={() => setIsEditing(false)}>
              <FaCheck />
            </button>
          ) : (
            <button id="check-btn">
              <FaPencilAlt onClick={() => setIsEditing(true)} />
            </button>
          )}
          <button id="delete-btn" onClick={(id) => deleteNote(id)}>
            <FaDumpster />
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          className="note-text"
          autoFocus={isEditing}
          onBlur={() => setIsEditing(false)}
          onChange={(e) => setNoteText(e.target.value)}
          value={noteText}
        ></textarea>
      ) : (
        <div
          className="note-read"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{ __html: marked(noteText) }}
        ></div>
      )}
    </div>
  );
}

//<div id="preview" dangerouslySetInnerHTML={{ __html: marked(text) }} />
