import React, { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401234567' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('');
  
  const nameChange = (event) =>
  {
    setNewName(event.target.value);
  };
  
  const numberChange = (event) =>
  {
    setNewNumber(event.target.value);
  };

  const formSubmit = (event) =>
  {
    event.preventDefault();

    const index = persons.findIndex(psn => psn.name === newName);
    if (index === -1)
    {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
    else
    {
      alert(`${newName} is already added to the phonebook.`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>name: <input value={newName} onChange={nameChange} /></div>
        <div>number: <input value={newNumber} onChange={numberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(psn => <div key={psn.name}>{psn.name} {psn.number}</div>)}
      </div>
    </div>
  )
}

export default App;
