import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Button = (props) => { 
  console.log(props)
  return (
    <div>
      <button type={props.type}>
        {props.text}
      </button>
    </div>
  )
}

const FormAddPerson = (props) => { 
  console.log(props)
  return (
    <form onSubmit={props.onSubmit}>
      <Input text={"name: "} value={props.newNameValue} onChange={props.newNameOnChange} />
      <Input text={"number: "} value={props.newNumberValue} onChange={props.newNumberOnChange} />
      <Button type={"submit"} text={"add"} />
    </form>
  )
}

const Input = (props) => { 
  console.log(props)
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterByName, setNewFilterByName] = useState('')

  useEffect(() => {
    console.log("effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  }, [])
  console.log("render", persons.length, "persons")

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
      <Input text={"filter shown with: "} value={newFilterByName} onChange={handleFilterByNameChange} />
      <h3>Add a new</h3>
      <FormAddPerson onSubmit={addPerson} newNameValue={newName} newNameOnChange={handleNameChange} newNumberValue={newNumber} newNumberOnChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilterByName} />
    </div>
  )

}

export default App