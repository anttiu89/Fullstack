import Button from "./Button"
import Input from "./Input"

const FormCreateBlog = (props) => { 
  console.log(props)
  return (
    <form onSubmit={props.onSubmitCreateBlog}>
      <Input text={"title: "} value={props.newTitleValue} onChange={props.newTitleOnChange} />
      <Input text={"author: "} value={props.newAuthorValue} onChange={props.newAuthorOnChange} />
      <Input text={"url: "} value={props.newUrlValue} onChange={props.newUrlOnChange} />
      <Button.ButtonType type={"submit"} text={"create"} />
    </form>
  )
}

export default FormCreateBlog