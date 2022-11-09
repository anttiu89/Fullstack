import { useState } from "react"
import Button from "./Button"
import Input from "./Input"

const FormCreateBlog = (props) => { 
  console.log(props)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    props.createBlog(blogObject)
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <Input text={"title: "} value={newTitle} onChange={handleTitleChange} />
      <Input text={"author: "} value={newAuthor} onChange={handleAuthorChange} />
      <Input text={"url: "} value={newUrl} onChange={handleUrlChange} />
      <Button.ButtonType type={"submit"} text={"create"} />
    </form>
  )
}

export default FormCreateBlog