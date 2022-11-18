import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import FormCreateBlog from "./FormCreateBlog"

test("renders blog title author", () => {
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
  expect(titleAuthorDiv).toHaveTextContent(blog.title + " " + blog.author)

  const urlDiv = screen.queryByText(blog.url)
  expect(urlDiv).toBeNull

  const urlLikes = screen.queryByText(blog.likes)
  expect(urlLikes).toBeNull
})

test("clicking the button view shows url and likes", async () => {
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

  const appUser = userEvent.setup()
  const button = screen.getByText("view")
  await appUser.click(button)

  const urlDiv = container.querySelector(".blogUrl")
  expect(urlDiv).toHaveTextContent(blog.url)

  const urlLikes = container.querySelector(".blogLikes")
  expect(urlLikes).toHaveTextContent(blog.likes)
})

test("clicking the button like calls event handler", async () => {
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

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleLikeClick={mockHandler} />)
  screen.debug()

  const appUser = userEvent.setup()
  const buttonView = screen.getByText("view")
  await appUser.click(buttonView)

  const buttonLike = screen.getByText("like")
  await appUser.click(buttonLike)
  await appUser.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test("FormCreateBlog calls callback with correct data onSubmit", async () => {
  const blogUser = {
    name: "TestUser"
  }

  const blog = {
    title: "TestTitle",
    author: "TestAuthor",
    url: "https://test.com",
    likes: 0,
    user: blogUser
  }

  const appUser = userEvent.setup()
  const createBlog = jest.fn()

  render(<FormCreateBlog createBlog={createBlog} />)
  screen.debug()

  const inputTitle = screen.getByPlaceholderText("Title")
  const inputAuthor = screen.getByPlaceholderText("Author")
  const inputUrl = screen.getByPlaceholderText("Url")
  const sendButton = screen.getByText("create")

  await appUser.type(inputTitle, blog.title)
  await appUser.type(inputAuthor, blog.author)
  await appUser.type(inputUrl, blog.url)
  await appUser.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})

