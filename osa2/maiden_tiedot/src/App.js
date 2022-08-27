import { useState, useEffect } from 'react'
import axios from 'axios'

const findCountries = (paCountryArray, paFind) => {
  console.log("find countries", paCountryArray)
  let countriesFound = paCountryArray.filter((country) => {
    if (paFind.length === 0 || country.name.toUpperCase().includes(paFind.toUpperCase()) === true) {
      return true
    }
    else {
      return false
    }
  })
  console.log(countriesFound.length)
  return countriesFound
}

const Country = (props) => {
  return (
    <div>{props.country.name}</div>
  )
}

const Countries = (props) => {
  console.log(props)
  let foundCountryArray = findCountries(props.countries, props.find)

  if (foundCountryArray.length === 1) {
    return (
      <div>
        <h1>{foundCountryArray[0].name}</h1>
        <div>capital {foundCountryArray[0].capital}</div>
        <div>area {foundCountryArray[0].area}</div>
        <h3>languages:</h3>
        <ul>
          {foundCountryArray[0].languages.map(value => {
            return <li key={value.name}>{value.name}</li>
          })}
        </ul>
        <div>
          <img src={foundCountryArray[0].flags.png} />
        </div>
      </div>
    )
  }
  else if (foundCountryArray.length <= 10 && foundCountryArray.length > 1) {
    return (
      <div>
        {foundCountryArray.map(country =>
          <Country key={country.name} country={country} />
        )}
      </div>
    )
  }
  else
  {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
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
  const [countries, setCountries] = useState([]) 
  const [newFindByName, setNewFindByName] = useState('')

  useEffect(() => {
    console.log("effect")
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
  }, [])
  console.log("render", countries.length, "countries")

  const handleFindByNameChange = (event) => {
    console.log(event.target.value)
    setNewFindByName(event.target.value)
  }

  return (
    <div>
      <Input text={"find countries "} value={newFindByName} onChange={handleFindByNameChange} />
      <Countries countries={countries} find={newFindByName} />
    </div>
  )

}

export default App
