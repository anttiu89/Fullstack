/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  console.log("Notification", notification)
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }
  if (notification !== "") {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
  
}

export default Notification