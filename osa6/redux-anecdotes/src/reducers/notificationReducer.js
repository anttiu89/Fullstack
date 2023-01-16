import { createSlice } from "@reduxjs/toolkit"

const initialState = { notification: "" }

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log("state notification create now: ", state.notification)
      console.log("action", action)
      const notification = action.payload
      state.notification = notification
      console.log("state notification create end: ", state.notification)
    },
    deleteNotification(state) {
      console.log("state notification delete now: ", state.notification)
      const notification = initialState.notification
      state.notification = notification
      console.log("state notification delete end: ", state.notification)
    },
  },
})

export const { createNotification, deleteNotification } = notificationSlice.actions

export const setNotification = (notification, notificationTime) => {
  return async dispatch => {
    console.log("setNotification")
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, notificationTime * 1000)
  }
}

export default notificationSlice.reducer