import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Message from "./components/Message"
import blogService from "./services/blogs"
import loginService from "./services/login"

const sortByLikesDescending = (a, b) => {
  if (a.likes > b.likes){
    return -1
  }
  if (a.likes < b.likes){
    return 1
  }
  return 0
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: null, isError: false })
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogService.getAll()
      const blogsSortedByLikes = data.sort(sortByLikesDescending)
      setBlogs(blogsSortedByLikes)
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
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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
        "loggedBlogappUser", JSON.stringify(user)
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
    console.log("Logout", user)
    setUser(null)
    setUsername("")
    setPassword("")
    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const handleLogoutClick = (user) => {
    if (window.confirm(`Logout user ${user.username}?`)) {
      logout(user)
    }
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleLikeClick = async (blogObject) => {
    ++blogObject.likes
    await updateBlog(blogObject)
  }

  const handleRemoveClick = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      await removeBlog(blogObject)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      console.log("Add blog:")
      console.log(blog)
      const blogsTemp = blogs.concat(blog)
      const blogsSortedByLikes = blogsTemp.sort(sortByLikesDescending)
      setBlogs(blogsSortedByLikes)
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

  const updateBlog = async (blogObject) => {
    try {
      const updateBlog = {
        user: blogObject.user.id,
        likes: blogObject.likes,
        author: blogObject.author,
        title: blogObject.title,
        url: blogObject.url
      }
      const blog = await blogService.update(blogObject.id, updateBlog)
      const blogsSortedByLikes = blogs.sort(sortByLikesDescending)
      setBlogs(blogsSortedByLikes)
      const newMessage = { message: `a blog ${blog.title} by ${blog.author} updated`, isError: false }
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

  const removeBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      const blogsTemp = blogs.filter((blog) => {
        if (blog.id !== blogObject.id) {
          return true
        }
        else {
          return false
        }
      })
      const blogsSortedByLikes = blogsTemp.sort(sortByLikesDescending)
      setBlogs(blogsSortedByLikes)
      const newMessage = { message: `a blog ${blogObject.title} by ${blogObject.author} removed`, isError: false }
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

  const blogFormRef = useRef()

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
        createBlog={addBlog}
        handleLikeClick={handleLikeClick}
        handleRemoveClick={handleRemoveClick}
        ref={blogFormRef} />
    </div>
  )
}

export default App
