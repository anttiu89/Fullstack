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

const Button = (props) => { 
  console.log(props)
  return (
    <button onClick={() => props.onClick(props.value)}>
      {props.text}
    </button>
  )
}

const Country = (props) => {
  console.log(props)
  return (
  <div>
      <h1>{props.country.name}</h1>
      <div>capital {props.country.capital}</div>
      <div>area {props.country.area}</div>
      <h3>languages:</h3>
      <ul>
        {props.country.languages.map(value => {
          return <li key={value.name}>{value.name}</li>
        })}
      </ul>
      <div>
        <img src={props.country.flags.png} />
      </div>
      <h2>Weather in {props.country.capital}</h2>
      <div>temperature {props.weather.temperature} Celsius</div>
      <div>wind {props.weather.windspeed} m/s</div>
    </div>
  )
}

const Countries = (props) => {
  console.log(props)
  let foundCountryArray = findCountries(props.countries, props.find)

  if (foundCountryArray.length === 1) {
    console.log(foundCountryArray[0])
    if (!props.weather.isFound) {
      const latitude = foundCountryArray[0].latlng[0]
      const longitude = foundCountryArray[0].latlng[1]
      props.initializeWeather(latitude, longitude)
    }
    return (
      <Country country={foundCountryArray[0]} weather={props.weather} />
    )
  }
  else if (foundCountryArray.length <= 10 && foundCountryArray.length > 1) {
    if (props.weather.isFound) {
      props.disposeWeather()
    }
    return (
      <div>
        {foundCountryArray.map(country => {
          return (
            <div key={country.name}>
              {country.name} <Button onClick={props.handleShowClick} text={"show"} value={country.name} />
            </div>)
        })}
      </div>
    )
  }
  else
  {
    if (props.weather.isFound) {
      props.disposeWeather()
    }
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
  const [weather, setWeather] = useState({ latitude: 0, longitude: 0, temperature: 0, windspeed: 0, isFound: false })

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

  const handleShowClick = (find) => {
    setNewFindByName(find)
  }

  const getWeather = (latitude, longitude) => {
    console.log("Latitude ", latitude, "Longitude ", longitude)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    console.log(url)
    const request = axios.get(url)
    return request.then(response => {
      console.log("Get", response.status)
        return response.data
    })
  }

  const initializeWeather = (latitude, longitude) => {
    getWeather(latitude, longitude).then(returnedWeather => {
      const weatherObject = { 
        latitude: returnedWeather.latitude, 
        longitude: returnedWeather.longitude, 
        temperature: returnedWeather.current_weather.temperature, 
        windspeed: returnedWeather.current_weather.windspeed, 
        isFound: true
      }
      setWeather(weatherObject)
    })
  }

  const disposeWeather = () => {
    const weatherObject = { 
      latitude: 0, 
      longitude: 0, 
      temperature: 0, 
      windspeed: 0, 
      isFound: false
    }
    setWeather(weatherObject)
  }

  return (
    <div>
      <Input text={"find countries "} value={newFindByName} onChange={handleFindByNameChange} />
      <Countries countries={countries} find={newFindByName} handleShowClick={handleShowClick} weather={weather} disposeWeather={disposeWeather} initializeWeather={initializeWeather} />
    </div>
  )

}

export default App
