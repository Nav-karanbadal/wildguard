import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"

import BlogDetails from "../../pages/BlogDetails"

import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}))

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")

  return {
    ...actual,
    useParams: vi.fn(),
  }
})

const mockDispatch = vi.fn()

const mockBlog = {
  ID: "1",
  "Blog Title": "The Wildlife Conservation Society Blog",
  "Focus Area": "Conservation",
  "Author/Organization": "Wildlife Conservation Society",
  "Last Updated": "2026-01-15",
  Description:
    "Wildlife conservation plays an important role in protecting biodiversity and maintaining healthy ecosystems.",
}

function renderBlogDetails(state = {}) {
  useSelector.mockReturnValue({
    blogs: [],
    loading: false,
    error: null,
    ...state,
  })

  return render(
    <MemoryRouter initialEntries={["/blog/1"]}>
      <BlogDetails />
    </MemoryRouter>
  )
}

describe("BlogDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    useDispatch.mockReturnValue(mockDispatch)

    useParams.mockReturnValue({
      id: "1",
    })
  })

  it("loads and displays blog details", () => {
    renderBlogDetails({
      blogs: [mockBlog],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "The Wildlife Conservation Society Blog",
        level: 1,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Conservation")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Wildlife Conservation Society")
    ).toBeInTheDocument()

    expect(
      screen.getByText(/2026-01-15/)
    ).toBeInTheDocument()
  })

  it("displays the story content", () => {
    renderBlogDetails({
      blogs: [mockBlog],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "About This Story",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Wildlife conservation plays an important role in protecting biodiversity and maintaining healthy ecosystems/
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Endangered species require particular attention because their populations may be small or declining/
      )
    ).toBeInTheDocument()
  })

  it("displays the blog image and navigation links", () => {
    renderBlogDetails({
      blogs: [mockBlog],
      loading: false,
      error: null,
    })

    const image = screen.getByRole("img", {
      name: "The Wildlife Conservation Society Blog",
    })

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src")

    expect(
      screen.getByRole("link", {
        name: "← Back to All Stories",
      })
    ).toHaveAttribute("href", "/blog")

    expect(
      screen.getByRole("link", {
        name: "Join the Mission",
      })
    ).toHaveAttribute("href", "/join")
  })

  it("shows an error when blog details cannot be loaded", () => {
    renderBlogDetails({
      blogs: [],
      loading: false,
      error: "Failed to load blogs",
    })

    expect(
      screen.getByRole("heading", {
        name: "Unable to Load Story",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Failed to load blogs")
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Back to Stories",
      })
    ).toHaveAttribute("href", "/blog")
  })

  it("shows an error when the requested blog does not exist", () => {
    useParams.mockReturnValue({
      id: "999",
    })

    renderBlogDetails({
      blogs: [mockBlog],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "Story Not Found",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "The wildlife story you are looking for does not exist."
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Back to Stories",
      })
    ).toHaveAttribute("href", "/blog")
  })
})