import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "text-title1",
      description: "text-description",
    },
    {
      title: "text-title2",
      description: "text-description",
    },
    {
      title: "text-title3",
      description: "text-description",
    },
    {
      title: "text-title4",
      description: "text-description",
    },
  ]);

  function FetchNotes() {
    axios.get("https://full-stack-t2ns.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    FetchNotes();
  }, []);

  function handleSubmit(e) {
  e.preventDefault();

  const { title, description } = e.target.elements;

  console.log(title.value, description.value);
  
  axios.post('https://full-stack-t2ns.onrender.com/api/notes',{
    title: title.value,
    description: description.value
  })
  .then((res)=>{
    console.log(res.data)

    FetchNotes()
  })
}

function handleDeleteNote(noteId) {
  axios.delete('https://full-stack-t2ns.onrender.com/api/notes'+noteId)
  .then((res)=>{
    console.log(res.data)
   
  })

}

  return (

    <div>

      <form className="note-create-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter title"/>
        <input type="text" name="description" placeholder="Enter Description"/>
        <button>Create Note</button>
      </form>

      <div className="notes">
      {notes.map((note) => {
        return (
          <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default App;
 