import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const user = {
    username: "Test"
  }

  const blogUser = {
    name: "Test"
  }

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test",
    url: "https://testi.com",
    likes: 0,
    user: blogUser
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  screen.debug()

  const titleAuthorDiv = container.querySelector(".blog")
  expect(titleAuthorDiv).toHaveTextContent("Component testing is done with react-testing-library" + " " + "Test")

  const urlDiv = container.querySelector(".blogUrl")
  expect(urlDiv).toBeNull

  const urlLikes = container.querySelector(".blogLikes")
  expect(urlLikes).toBeNull
})