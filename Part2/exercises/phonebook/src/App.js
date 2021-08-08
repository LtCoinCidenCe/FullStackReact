import React, { useState, useEffect } from 'react'
import Display from './components/display';
import Filter from './components/filter'
import InputForm from './components/inputForm';
import personService from './service/persons';

const App = () =>
{
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');

  useEffect(() =>
  {
    personService.getAll().then(initialPersons => { setPersons(initialPersons) });
  }, []);

  const filterWordChange = (event) => setFilterWord(event.target.value);
  const nameChange = (event) => setNewName(event.target.value);
  const numberChange = (event) => setNewNumber(event.target.value);
  const insensitiveInclude = (psn) => psn.name.toLowerCase().includes(filterWord.toLowerCase());

  const filtered = filterWord ? persons.filter(insensitiveInclude) : persons;

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
      personService.create(newPerson).then(returnedPerson =>
      {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
        .catch(error => { alert(error) }); // try not to reach this line
    }
    else
    {
      // update the number
      // alert(`${newName} is already added to the phonebook.`);
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`))
      {
        const targetPerson = {
          ...persons[index],
          number: newNumber
        };
        personService.update(targetPerson.id, targetPerson).then(returnedPerson =>
        {
          setPersons(persons.map(psn => psn.id !== targetPerson.id ? psn : returnedPerson));
          setNewName('');
          setNewNumber('');
        })
          .catch(error =>
          {
            // assume that the problem is that it is already deleted
            alert(`the person '${newName}' was already deleted from server`);
            setPersons(persons.filter(psn => psn.id !== targetPerson.id));
          })
      }
    }
  }

  /** id is the id in the database, not index in persons array */
  const removePerson = (id) =>
  {
    const targetPerson = persons.find(psn => psn.id === id);
    const idx = persons.indexOf(targetPerson); // it is not guaranteed that the index of target in array is the same as id in the object 
    // (nor even close relation)
    if (window.confirm(`Delete ${targetPerson.name}`))
    {
      personService.remove(id).then(info =>
      {
        console.log(info);
        const newList = persons.slice(0, idx).concat(persons.slice(idx + 1));
        setPersons(newList);
      })
        .catch(error => { alert(error) }); // try not to reach this line;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} filterWordChange={filterWordChange} />
      <h2>add a new</h2>
      <InputForm formSubmit={formSubmit} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <Display peopleList={filtered} removePerson={removePerson} />
    </div>
  )
}

export default App;
