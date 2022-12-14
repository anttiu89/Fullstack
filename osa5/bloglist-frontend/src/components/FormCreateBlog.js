import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import PropTypes from "prop-types"

const FormCreateBlog = (props) => {
  //console.log(props)

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

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
    console.log("AddBlogStart")
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
    console.log("AddBlogEnd")
  }

  return (
    <form onSubmit={addBlog}>
      <Input id="Title" placeholder="Title" text={"title: "} value={newTitle} onChange={handleTitleChange} />
      <Input id="Author" placeholder="Author" text={"author: "} value={newAuthor} onChange={handleAuthorChange} />
      <Input id="Url" placeholder="Url" text={"url: "} value={newUrl} onChange={handleUrlChange} />
      <Button.ButtonType className="buttonCreate" id="Create" type={"submit"} text={"create"} />
    </form>
  )
}

FormCreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default FormCreateBlog