import React, { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const nameChange = (event) =>
  {
    setNewName(event.target.value);
  };

  const formSubmit = (event) =>
  {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(psn => <div key={psn.name}>{psn.name}</div>)}
      </div>
    </div>
  )
}

export default App;
