import React from 'react'
import Note from './components/Note'

const App = ({ notes }) =>
{
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note}/>  // Here the key is the attr of Note: element in the array
        )}
      </ul>
    </div>
  )
}

export default App
