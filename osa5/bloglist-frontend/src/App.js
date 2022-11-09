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
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }
    
    try {
      fetchData()
    } catch (exception) {
      const newMessage = { message: "fetchData failed", isError: true }
      setMessage(newMessage)
      setTimeout(() => {
        const emptyMessage = { message: null, isError: false }
        setMessage(emptyMessage)
      }, 5000)
    }
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
      const newMessage = { message: "wrong username or password", isError: true }
      setMessage(newMessage)
      setTimeout(() => {
        const emptyMessage = { message: null, isError: false }
        setMessage(emptyMessage)
      }, 5000)
    }
  }

  const logout = (user) => {
    setUser(null)
    setUsername("")
    setPassword("")
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogoutClick = (user) => {
    if (window.confirm(`Logout user ${user.username}?`)) {
      console.log("Logout", user)
      logout(user)
    }
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")
      const newMessage = { message: `a new blog ${blog.title} by ${blog.author} added`, isError: false }
      setMessage(newMessage)
      setTimeout(() => {
        const emptyMessage = { message: null, isError: false }
        setMessage(emptyMessage)
      }, 5000)
    } catch (exception) {
      const newMessage = { message: exception.response.data.error, isError: true }
      setMessage(newMessage)
      setTimeout(() => {
        const emptyMessage = { message: null, isError: false }
        setMessage(emptyMessage)
      }, 5000)
    }
  }

  return (
    <div>
      <Message message={message} />
      <Login handleLogin={handleLogin} 
      username={username} 
      handleUsernameChange={handleUsernameChange} 
      password={password} 
      handlePasswordChange={handlePasswordChange} 
      user={user} />
      <Blogs blogs={blogs} 
      user={user} 
      handleLogoutClick={handleLogoutClick} 
      newTitleValue={newTitle} 
      newTitleOnChange={handleTitleChange} 
      newAuthorValue={newAuthor} 
      newAuthorOnChange={handleAuthorChange} 
      newUrlValue={newUrl} 
      newUrlOnChange={handleUrlChange}
      onSubmitCreateBlog={addBlog} />
    </div>
  )
}

export default App
