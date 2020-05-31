import React from "react";
import { useState } from "react";
import Notepad from "./Notepad";
import "./App.css";
import { FaPlusSquare } from "react-icons/fa";

const initNotes = [
  {
    id: 0,
    date: new Date().toString(),
    text: "",
  },
];
//generates a random id
const idGen = () => {
  return Math.round(Math.random() * 99999);
};

function App() {
  const [notes, setNotes] = useState(initNotes);
  const localNotes = JSON.parse(localStorage.getItem("savedNotes")) || false;

  const addNote = () => {
    setNotes(() => [
      ...notes,
      { id: idGen(), date: new Date().toString(), text: "" },
    ]);
    localStorage.setItem("savedNotes", JSON.stringify(notes));
  };

  const deleteNote = (id) => {
    let newNotes = [...notes];
    let filteredNotes = newNotes.filter((note) => note.id !== id);
    setNotes(() => filteredNotes);
    localStorage.setItem("savedNotes", JSON.stringify(filteredNotes));
  };

  React.useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(notes));
    console.log("localNotes:", localNotes);
  }, [notes, localNotes]);

  return (
    <div className="App">
      <div className="header-wrapper">
        <h1 id="title">React Markdown Notes</h1>
        <button id="add-note-btn" onClick={addNote}>
          <FaPlusSquare />
        </button>
      </div>
      {localNotes
        ? localNotes.map((note, i) => (
            <Notepad
              key={note.id}
              id={note.id}
              date={note.date}
              text={note.text}
              deleteNote={deleteNote}
            />
          ))
        : notes.map((note, i) => (
            <Notepad
              key={note.id}
              id={note.id}
              date={note.date}
              text={note.text}
              deleteNote={deleteNote}
            />
          ))}
    </div>
  );
}

export default App;
