import React, { useState, useEffect } from 'react'
import Display from './components/display';
import Filter from './components/filter'
import InputForm from './components/inputForm';
import axios from 'axios';

const App = () =>
{
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' },
  //   { name: 'Kimi Räikkönen', number: '0465656565' }
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');

  const hook = () =>
  {
    console.log('effect')
    const eventHandler = (response) =>
    {
      console.log('promise fulfilled');
      setPersons(response.data);
    }
    const promise = axios.get('http://localhost:3001/persons');
    promise.then(eventHandler);
  }

  useEffect(hook, []);

  const filterWordChange = (event) =>
  {
    setFilterWord(event.target.value);
  };

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
      
      // the server should be able to handle identical names for post, not here
      // let me fix that when I have learned about server
      axios.post('http://localhost:3001/persons', newPerson).then(returnedPerson =>
      {
        setPersons(persons.concat(returnedPerson.data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => { alert(error) }); // try not to reach this line
    }
    else
    {
      alert(`${newName} is already added to the phonebook.`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} filterWordChange={filterWordChange} />
      <h2>add a new</h2>
      <InputForm formSubmit={formSubmit} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <Display peopleList={filtered} />
    </div>
  )
}

export default App;
