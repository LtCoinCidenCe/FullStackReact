import React, { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Kimi Räikkönen', number: '0465656565' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');

  const filterWordChange = (event) =>
  {
    setFilterWord(event.target.value);
  }

  const nameChange = (event) =>
  {
    setNewName(event.target.value);
  };

  const numberChange = (event) =>
  {
    setNewNumber(event.target.value);
  };

  const insensitiveInclude = (psn) =>
  {
    return psn.name.toLowerCase().includes(filterWord.toLowerCase());
  }

  const filtered = filterWord ? persons.filter(insensitiveInclude) : persons; // to reduce consumption

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
      <div><span>filter shown with </span><input value={filterWord} onChange={filterWordChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={formSubmit}>
        <div>name: <input value={newName} onChange={nameChange} /></div>
        <div>number: <input value={newNumber} onChange={numberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered.map(psn => <div key={psn.name}>{psn.name} {psn.number}</div>)}
      </div>
    </div>
  )
}

export default App;
