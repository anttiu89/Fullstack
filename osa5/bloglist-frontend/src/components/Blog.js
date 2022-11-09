import { useState } from 'react'
import Button from "./Button"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewClick = (visible) => {
    setVisible(visible)
  }

  const handleLikeClick = (like) => {
    
  }

  console.log(props)
  return (
  <div>
    {props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"view"} value={true} />
    <div style={showWhenVisible}>
      <div style={blogStyle}>
        <div>{props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"hide"} value={false} /></div>
        <div>{props.blog.url}</div>
        <div>{props.blog.likes} <Button.ButtonOnClick onClick={handleLikeClick} text={"like"} value={1} /></div> 
        <div>{props.blog.user.name}</div>
      </div>
    </div>
  </div>  
  )
}

export default Blog