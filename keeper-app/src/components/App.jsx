import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { notes } from "./notes";

function App() {
  const [notesState, setNotes] = useState(notes);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <Header />
      <div className="add-note-container">
        <CreateArea onAdd={handleAddNote} />
      </div>
      {notesState.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          deleteNote={handleDeleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
