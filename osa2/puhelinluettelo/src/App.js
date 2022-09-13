import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const containsName = (paPersonArray, paName) => {
  let nameArray = paPersonArray.map((person) => {
    return person.name;
  })
  let containsVariable = nameArray.includes(paName)
  return containsVariable
}

const getPerson = (paPersonArray, paName) => {
  let personObject = {
    name: "",
    number: "",
    id: -1
  }

  let filteredPersonArray = paPersonArray.filter((person) => {
    return person.name === paName
  })

  if (filteredPersonArray.length > 0) {
    personObject = {
      name: filteredPersonArray[0].name,
      number: filteredPersonArray[0].number,
      id: filteredPersonArray[0].id
    }
  }

  return personObject
}

const filterPersons = (paPersonArray, paFilter) => {
  console.log(paPersonArray)
  let filteredPersonArray = paPersonArray.filter((person) => {
    if (paFilter.length === 0 || person.name.toUpperCase().includes(paFilter.toUpperCase()) === true) {
      return true
    }
    else {
      return false
    }
  })
  console.log(filteredPersonArray.length)
  return filteredPersonArray
}

const Person = (props) => {
  console.log(props)
  return (
    <p>{props.person.name} {props.person.number} <Button onClick={props.handleRemoveClick} text={"delete"} value={props.person} /> </p>
  )
}

const Persons = (props) => {
  console.log("Persons props", props)
  let filteredPersonArray = filterPersons(props.persons, props.filter)
  return (
    <div>
      {filteredPersonArray.map(person =>
        <Person key={person.name} person={person} handleRemoveClick={props.handleRemoveClick} />
      )}
    </div>
  )
}

const Button = (props) => { 
  console.log("Button", props)
  return (
    <button onClick={() => props.onClick(props.value)}>
      {props.text}
    </button>
  )
}

const ButtonSubmit = (props) => { 
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
      <ButtonSubmit type={"submit"} text={"add"} />
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

const Message = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterByName, setNewFilterByName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (containsName(persons, newName) === true) {
      let personObjectUpdate = getPerson(persons, newName)
      if (personObjectUpdate.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          console.log("Update", newName, newNumber)
          personObjectUpdate.number = newNumber
          console.log("Update", personObjectUpdate)
          updatePerson(personObjectUpdate)
        }
      }
      else {
        alert(`${newName} is already added to phonebook`)
      }
    }
    else {
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (personObject) => {
    personService
      .update(personObject.id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map((person) => {
          if (person.id !== personObject.id) {
            return person
          }
          else {
            return updatedPerson
          }
        }))
        setMessage(
          `Updated ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const removePerson = (personObject) => {
    personService
      .remove(personObject.id)
      .then(() => {
        setPersons(persons.filter((person) => {
          if (person.id !== personObject.id) {
            return true
          }
          else {
            return false
          }
        }))
        setMessage(
          `Deleted ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
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

  const handleRemoveClick = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      console.log("Delete", person)
      removePerson(person)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Input text={"filter shown with: "} value={newFilterByName} onChange={handleFilterByNameChange} />
      <h3>Add a new</h3>
      <FormAddPerson onSubmit={addPerson} newNameValue={newName} newNameOnChange={handleNameChange} newNumberValue={newNumber} newNumberOnChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilterByName} handleRemoveClick={handleRemoveClick} />
    </div>
  )

}

export default App