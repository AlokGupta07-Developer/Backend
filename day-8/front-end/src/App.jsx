import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState(null);
  const [notes, setNotes] = useState([
    {
      title: "text-title 1",
      description: "text-description 1",
    },
    {
      title: "text-title 1",
      description: "text-description 1",
    },
    {
      title: "text-title 1",
      description: "text-description 1",
    },
    {
      title: "text-title 1",
      description: "text-description 1",
    },
  ]);

  //Fetch notes from Backend. Method: GET
  function fetchNotes() {
    axios.get("http://localhost:3000/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    //use useEffect because every render call axios so data comes multiple times
    fetchNotes();
  }, []);

  //Create note using form and save into database then get note on frontend
  function handleNotes(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        e.target.reset()
        fetchNotes(); //call fetch note
      });
  }

  //To delete note
  function handleDeleteNote(noteId) {
    axios.delete(`http://localhost:3000/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  //To update the title or description
  function handleUpdateClick(noteId) {
    setUpdateNoteId(noteId);
    setShowUpdateForm(true);
  }
  function handleUpdateSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .patch(`http://localhost:3000/notes/${updateNoteId}`, {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);

        setShowUpdateForm(false);
        setUpdateNoteId(null);

        fetchNotes();
      });
  }

  //function call on submit form
  return (
    <div className="app">
      <form className="create-note-form" onSubmit={handleNotes}>
        <input type="text" name="title" placeholder="Enter note title" />
        <input
          type="text"
          name="description"
          placeholder="Enter note description"
        />
        <button>Create note</button>
      </form>

      {showUpdateForm && (
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" name="title" placeholder="Enter title" />

          <textarea
            name="description"
            placeholder="Enter description"
          ></textarea>

          <button type="submit">Update Note</button>

          <button
            type="button"
            onClick={() => {
              setShowUpdateForm(false);
              setUpdateNoteId(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button onClick={() => handleUpdateClick(note._id)}>
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
