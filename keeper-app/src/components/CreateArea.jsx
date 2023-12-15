import React, { useState, useEffect } from "react";
import Note from "./Note"; // Import the Note component

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes when the component mounts
    fetchNotes();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const handleDeleteNote = async (index) => {
    console.log('Deleting note at index:', index);

    try {
      // Delete the note by calling the deleteNote function passed as a prop
      // and then fetch updated notes
      await fetch(`http://localhost:4000/api/notes/${notes[index]._id}`, {
        method: 'DELETE',
      });

      // Update state to remove the deleted note
      setNotes((prevNotes) => {
        const updatedNotes = Array.isArray(prevNotes) ? [...prevNotes] : [];
        return updatedNotes.filter((_, i) => i !== index);
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  function submitNote(event) {
    event.preventDefault();

    fetch('http://localhost:4000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        // Use a callback function to avoid race conditions with state updates
        setNotes((prevNotes) => [...prevNotes, data]);

        //props.onAdd(data);
        setNote({
          title: '',
          content: '',
        });
      })
      .catch((error) => console.error('Error:', error));
  }

  function fetchNotes() {
    // Fetch notes from the server
    fetch('http://localhost:4000/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching notes:', error));
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>

      {/* Display notes using the Note component */}
      <div>
        <h2>Notes:</h2>
        {notes.map((note, index) => (
          <Note
            key={index}
            index={index}
            title={note.title}
            content={note.content}
            deleteNote={() => handleDeleteNote(index)} // Pass the index
          />
        ))}
      </div>
    </div>
  );
}

export default CreateArea;
