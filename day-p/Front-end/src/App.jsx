import axios from "axios";
import { useEffect ,useState } from "react";

const App = () => {

  const [notes, setNotes] = useState([
    {
      title: "text-title1",
      description: "text-description1"
    },
     {
      title: "text-title1",
      description: "text-description1"
    },
     {
      title: "text-title1",
      description: "text-description1"
    },
     {
      title: "text-title1",
      description: "text-description1"
    },
  ])

  function fetchNotes() {
  axios.get("http://localhost:3000/notes")
  .then((res)=>{
    console.log(res.data)
    setNotes(res.data.notes)
  })
}

useEffect(()=>{
  fetchNotes()
},[])

function handleSubmit(e) {
  e.preventDefault()
  const {title, description} = 
  axios.post("http://localhost:3000/notes",{
    title: title.value,

  })

}
  return (
    <div>

      <form className="note-create-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter title"/>
        <input type="text" name="description" placeholder="Enter description"/>
        <button>Create Note</button>
      </form>
      <div className="notes">
        {
          notes.map((note, index)=>{
            return <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              </div>
          })
        }
      </div>
      
    </div>
  )
}

export default App
