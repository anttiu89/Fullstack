import { useState } from 'react'

const containsName = (paPersonArray, paName) => {
  let nameArray = paPersonArray.map((person) => {
    return person.name;
  })
  let containsVariable = nameArray.includes(paName)
  return containsVariable
}

const filterPersons = (paPersonArray, paFilter) => {
  console.log(paPersonArray)
  let filteredPersonArray = paPersonArray.map((person) => {
    if (paFilter.length === 0 || person.name.toUpperCase().includes(paFilter.toUpperCase()) === true) {
      const personObject = {
        name: person.name,
        number: person.number
      }
      return personObject;
    }
    else {
      const personObject = {
        name: "",
        number: ""
      }
      return personObject;
    }
  })

  filteredPersonArray = filteredPersonArray.filter(person => person.name !== "")
  console.log(filteredPersonArray.length)
  return filteredPersonArray
}

const Person = (props) => {
  return (
    <p>{props.person.name} {props.person.number}</p>
  )
}

const Persons = (props) => {
  console.log(props)
  let filteredPersonArray = filterPersons(props.persons, props.filter)
  return (
    <div>
      {filteredPersonArray.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterByName, setNewFilterByName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (containsName(persons, newName) === true) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterByNameChange = (event) => {
    console.log(event.target.value)
    setNewFilterByName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input value={newFilterByName} onChange={handleFilterByNameChange} />
        </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filter={newFilterByName} />
      </div>
    </div>
  )

}

export default App