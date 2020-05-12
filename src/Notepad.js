import React from "react";
import { useState } from "react";
import { FaPencilAlt, FaDumpster, FaCheck } from "react-icons/fa";
import marked from "marked";

export default function Notepad({ id, date, text, deleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);
  const localNote = JSON.parse(localStorage.getItem(`noteItem${id}`)) || false;
  let { savedDate, savedText } = localNote || false;

  const handleChange = (e) => {
    setNoteText(e.target.value);
    localStorage.setItem(
      `noteItem${id}`,
      JSON.stringify({
        savedId: id,
        savedDate: date,
        savedText: e.target.value,
      })
    );
  };

  const deleteText = (id) => {
    setIsEditing(false);
    setNoteText("");
    localStorage.setItem(
      `noteItem${id}`,
      JSON.stringify({
        savedId: null,
        savedDate: null,
        savedText: "",
      })
    );
    deleteNote(id);
  };
  return (
    <div className="notepad-wrapper">
      <div className="notepad-header">
        <p className="date">{savedDate ? savedDate : date}</p>
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
          <button
            id="delete-btn"
            onClick={() => {
              deleteText(id);
            }}
          >
            <FaDumpster />
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          className="note-text"
          autoFocus={isEditing}
          onBlur={() => setIsEditing(false)}
          onChange={handleChange}
          value={savedText ? savedText : noteText}
        ></textarea>
      ) : (
        <div
          className="note-read"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{
            __html: savedText ? marked(savedText) : marked(noteText),
          }}
        ></div>
      )}
    </div>
  );
}
