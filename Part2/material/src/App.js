import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () =>
{
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const hook = () =>
  {
    console.log('effect')

    const eventHandler = (response) =>
    {
      console.log('promise fulfilled');
      setNotes(response.data);
    }

    const promise = axios.get('http://localhost:3001/notes');
    promise.then(eventHandler);
  }

  useEffect(hook, [])


  const handleNoteChange = (event) =>
  {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const addNote = (event) =>
  {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response =>
      {
        setNotes(notes.concat(response.data)) // new note returned
        setNewNote('')
      })
  }

  const checkImportant = (note) =>
  {
    if (note.important === true)
      return true;
    else
      return false;
  }

  const notesToShow = showAll ? notes : notes.filter(checkImportant);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />  // Here the key is the attr of Note: element in the array
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
