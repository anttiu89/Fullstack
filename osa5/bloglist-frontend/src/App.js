import { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Message from "./components/Message"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: null, isError: false })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      const newMessage = { 
        message: "wrong credentials", 
        isError: true 
      }
      setMessage(newMessage)
      setTimeout(() => {
        const emptyMessage = { 
          message: null, 
          isError: false 
        }
        setMessage(emptyMessage)
      }, 5000)
    }
  }

  return (
    <div>
      <Message message={message} />
      <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} />
      <Blogs blogs={blogs} user={user} />
    </div>
  )
}

export default App
