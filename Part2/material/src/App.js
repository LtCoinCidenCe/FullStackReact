import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) =>
{
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

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
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
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
