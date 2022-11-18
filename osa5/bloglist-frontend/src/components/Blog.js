import { useState } from "react"
import Button from "./Button"
import PropTypes from "prop-types"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)
  const showWhenRemoveVisible = { display: removeVisible ? "" : "none" }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewClick = (visible) => {
    setVisible(visible)
    setRemoveVisible(props.user.username === props.blog.user.username)
  }

  //console.log(props)
  if (!visible) {
    return (
      <div style={blogStyle} className="blog">
        <div className="blogTitleAuthor">{props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"view"} value={true} /></div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className="blog">
        <div className="blogTitleAuthor">{props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"hide"} value={false} /></div>
        <div className="blogUrl">{props.blog.url}</div>
        <div className="blogLikes">{props.blog.likes} <Button.ButtonOnClick onClick={props.handleLikeClick} text={"like"} value={props.blog} /></div>
        <div className="blogUser">{props.blog.user.name}</div>
        <div style={showWhenRemoveVisible}>
          <Button.ButtonOnClick onClick={props.handleRemoveClick} text={"remove"} value={props.blog} />
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog