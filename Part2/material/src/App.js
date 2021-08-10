import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './service/notes';
import Notification from './components/Notification';

const Footer = () =>
{
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = () =>
{
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  const hook = () =>
  {
    // console.log('effect')
    // const eventHandler = (response) =>
    // {
    //   console.log('promise fulfilled');
    //   setNotes(response.data);
    // }
    // const promise = axios.get('http://localhost:3001/notes');
    // promise.then(eventHandler);
    noteService.getAll().then(initialNotes => { setNotes(initialNotes) });
  }

  useEffect(hook, [])


  const toggleImportanceOf = id =>
  {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote =>
      {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error =>
      {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() =>
        {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id));
      })
    // axios.put(url, changedNote).then(response =>
    // {
    //   // note returned
    //   setNotes(notes.map(note => note.id !== id ? note : response.data)) // array.map just to replace the new note
    // })
  }

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

    noteService.create(noteObject).then(returnedNote =>
    {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    })
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response =>
    //   {
    //     setNotes(notes.concat(response.data)) // new note returned
    //     setNewNote('')
    //   })
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
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />  // Here the key is the attr of Note: element in the array
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
