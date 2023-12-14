import React from "react";

function Note(props) {
  const handleDelete = () => {
    // Call the deleteNote function passed as a prop
    props.deleteNote(props.id);
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Note;
