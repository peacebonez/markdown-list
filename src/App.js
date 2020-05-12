import React from "react";
import { useState } from "react";
import Notepad from "./Notepad";
import "./App.css";
import { FaPlusSquare } from "react-icons/fa";

let id = 0;
const idGen = () => {
  return id++;
};

const dateNow = new Date().toString();

const initNotes = [
  {
    id: 0,
    date: dateNow,
    text: "",
  },
];

function App() {
  const [notes, setNotes] = useState(initNotes);

  const addNote = () => {
    setNotes([...notes, { id: idGen(), date: dateNow, text: "" }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <div className="header-wrapper">
        <h1 id="title">React Markdown Notes</h1>
        <button id="add-note-btn" onClick={addNote}>
          <FaPlusSquare />
        </button>
      </div>
      {notes.map((note, i) => (
        <Notepad
          key={note.id}
          id={idGen()}
          date={note.date}
          text={note.text}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}

export default App;
